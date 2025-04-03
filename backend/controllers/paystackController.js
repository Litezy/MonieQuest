const crypto = require('crypto');
const BuyCrypto = require('../models').exchangeBuys;
const BankWithdraw = require('../models').withdrawals
const Wallet = require('../models').wallets
const User = require('../models').users;
const { ServerError } = require('../utils/utils');
const secret = process.env.PAYSTACK_SECRET;
const axios = require('axios');
const otpGenerator = require('otp-generator');
const { sequelize } = require('../models');
const PAYSTACK_URL = 'https://api.paystack.co';


exports.handleWebhook = async (req, res) => {
    try {
        // Generate hash using your secret key and request body
        const hash = crypto.createHmac('sha512', secret)
            .update(JSON.stringify(req.body))
            .digest('hex');

        // Compare the hash with Paystack's signature
        if (hash !== req.headers['x-paystack-signature']) {
            console.log("❌ Invalid Paystack Webhook Signature");
            return res.json({ status: 400, msg: "Invalid signature" });
        }

        const event = req.body;
        console.log("✅ Webhook Event Received:", JSON.stringify(event, null, 2));

        if (!event.data || !event.event) {
            console.error("❌ Webhook payload is missing 'data' or 'event' field");
            return res.json({ status: 400, msg: "Invalid webhook data" });
        }

        const { event: eventType, data } = event;
        const { status, reference, amount, customer } = data;
        const newAmt = amount / 100;

        if (eventType === "charge.success") {
            // ✅ Handle Successful Crypto Buy Payment
            let transaction = await BuyCrypto.findOne({ where: { reference } });

            if (!transaction) {
                transaction = await BuyCrypto.findOne({
                    where: { email: customer.email },
                    include: [{ model: User, as: 'crypto_buyer' }]
                });

                if (!transaction) {
                    console.log(`❌ Crypto transaction not found: ${reference}`);
                    return res.json({ status: 400, msg: "Transaction not found" });
                }
            }

            if (transaction.status === "paid") {
                console.log(`✅ Crypto transaction ${reference} already marked as paid.`);
                return res.status(200).json({ msg: "Transaction already processed", data: transaction });
            }

            transaction.amount_in_naira = parseFloat(newAmt);
            transaction.status = "paid";
            await transaction.save();

            console.log(`✅ Crypto transaction ${reference} updated successfully.`);
            return res.json({ status: 200, msg: "Crypto transaction marked as paid successfully", data: transaction });

        } else if (eventType === "charge.failed") {
            // ❌ Handle Failed Crypto Buy Payment
            let transaction = await BuyCrypto.findOne({ where: { reference } });

            if (!transaction) {
                console.log(`❌ Failed crypto transaction not found: ${reference}`);
                return res.json({ status: 400, msg: "Failed transaction not found" });
            }

            transaction.status = "failed";
            await transaction.save();
            return res.json({ status: 200, msg: "Crypto transaction failed", data: transaction });

        } else if (eventType === "transfer.success") {
            // ✅ Handle Admin Approving Bank Withdrawal Request
            let withdrawal = await BankWithdraw.findOne({ where: { reference_id: reference } });

            if (!withdrawal) {
                return res.json({ status: 400, msg: "Withdrawal transaction not found" });
            }

            withdrawal.status = "completed";
            withdrawal.transfer_status = 'completed'
            await withdrawal.save();
            return res.json({ status: 200, msg: "Bank withdrawal approved", data: withdrawal });

        } else if (eventType === "transfer.failed") {
            try {
                // Find the failed withdrawal
                let withdrawal = await BankWithdraw.findOne({
                    where: { reference_id: reference },
                    include: [{ model: User, as: "user_withdrawal" }]
                });

                if (!withdrawal) {
                    console.log(`Failed withdrawal transaction not found: ${reference}`);
                    return res.json({ status: 400, msg: "Failed withdrawal transaction not found" });
                }

                // Find the user's wallet
                const findWallet = await Wallet.findOne({ where: { user: withdrawal?.user_withdrawal.id } });

                if (!findWallet) {
                    return res.json({ status: 400, msg: "User wallet not found for reverse" });
                }

                // Start a database transaction
                await sequelize.transaction(async (t) => {
                    // Reverse the funds
                    findWallet.total_outflow = parseFloat(findWallet.total_outflow || 0) - parseFloat(withdrawal?.amount)
                    findWallet.balance = parseFloat(findWallet.balance || 0) + parseFloat(withdrawal.amount);
                    await findWallet.save({ transaction: t });


                    // Update withdrawal status
                    withdrawal.status = "failed";
                    await withdrawal.save({ transaction: t });
                });

                return res.json({ status: 200, msg: "Bank withdrawal failed and funds reversed", data: withdrawal });
            } catch (error) {
                console.error("Error handling failed transfer:", error);
                return res.status(500).json({ msg: "Error processing failed transfer", error: error.message });
            }

        } else {
            console.log(`⚠️ Unhandled event type: ${eventType}`);
            return res.json({ status: 400, msg: `Unhandled event type: ${eventType}` });
        }

    } catch (error) {
        console.error("Error processing webhook:", error.message);
        return res.json({ status: 500, msg: "Internal server error" });
    }
};


exports.InitializeCryptoBuyPayment = async (req, res) => {
    try {
        const { id, amount } = req.body;
        if (!id || !amount) return res.json({ status: 400, msg: "Invalid request" });
        if (isNaN(amount)) return res.json({ status: 400, msg: 'Amount must be a number, not any other data type' });

        // Find the order in the database
        const findOrder = await BuyCrypto.findOne({
            where: { id },
            include: [{ model: User, as: 'crypto_buyer' }]
        });

        if (!findOrder) return res.json({ status: 404, msg: "Order ID not found" });

        // If the order already has a reference, use it
        let reference = findOrder.reference;
        if (!reference) {
            reference = `TXN_${otpGenerator.generate(10, { specialChars: false, lowerCaseAlphabets: false, upperCaseAlphabets: false })}`;
            findOrder.reference = reference;
            await findOrder.save(); // Save the reference to the order
        }

        // Prepare payment payload
        const payload = {
            email: findOrder?.crypto_buyer?.email,
            amount: amount * 100,
            reference: reference
        };

        // Send request to Paystack
        const response = await axios.post(`https://api.paystack.co/transaction/initialize`, payload, {
            headers: {
                Authorization: `Bearer ${secret}`,
                "Content-Type": 'application/json'
            }
        });

        const data = response.data;

        return res.json({ status: 200, msg: 'Payment initialized', data });
    } catch (error) {
        ServerError(res, error);
    }
};



/**
 * @desc Admin initiates a transfer to a user
 * @route POST /admin/transfer
 * @access Admin
 */


exports.getBanksFromPayStack = async (req, res) => {
    try {
        const response = await axios.get("https://api.paystack.co/bank", {
            headers: {
                Authorization: `Bearer ${secret}`,
                "Content-Type": "application/json"
            }
        });
        const data = response.data.data
        const filteredBanks = []
        const filter = data.filter((trans) => trans.supports_transfer === true)
        filteredBanks.push(filter)
        res.json({ status: 200, msg: "banks that support transfers", data: filteredBanks });

    } catch (error) {
        ServerError(res.error)
    }
};


exports.adminTransfer = async (req, res) => {
    try {
        const { id, reason } = req.body;

        // 1. Validate Inputs
        if (!id || !reason) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        // 2. Find Withdrawal Request
        const withdrawal = await BankWithdraw.findOne({
            where: { id },
            include: [{ model: User, as: 'user_withdrawal' }]
        });

        if (!withdrawal) {
            return res.status(404).json({ msg: "Withdrawal not found" });
        }

        // 3. Get Valid Bank Codes
        const banksResponse = await axios.get("https://api.paystack.co/bank", {
            headers: {
                Authorization: `Bearer ${secret}`,
                "Content-Type": "application/json"
            }
        });

        // 4. Find Matching Bank
        const bank = banksResponse.data.data.find(b =>
            b.name.toLowerCase() === withdrawal.bank_name.toLowerCase() &&
            b.supports_transfer
        );

        if (!bank) {
            return res.status(400).json({
                msg: "Bank not supported for transfers",
                solution: "Use Paystack's /bank endpoint to verify supported banks"
            });
        }

        // 5. Create Recipient
        const recipient = await axios.post(
            `${PAYSTACK_URL}/transferrecipient`,
            {
                type: "nuban",
                name: withdrawal?.bank_holder,
                account_number: withdrawal.account_number,
                bank_code: bank.code,
                currency: "NGN"
            },
            { headers: { Authorization: `Bearer ${secret}` } }
        );

        // 6. Proceed with Transfer
        const transfer = await axios.post(
            `${PAYSTACK_URL}/transfer`,
            {
                source: "balance",
                amount: withdrawal.amount * 100,
                recipient: recipient.data.data.recipient_code,
                reason,
                reference: `TRANS_${crypto.randomBytes(8).toString("hex")}`
            },
            { headers: { Authorization: `Bearer ${secret}` } }
        );
        // 7. Update Database
        await withdrawal.update({
            reference_id: transfer.data.data.reference,
            status: "pending",
            transfer_status: 'initiated'
        });

        return res.json({
            status: 200,
            msg: "Transfer initiated",
            data: transfer.data.data
        });

    } catch (error) {
        console.error("Transfer Error:", {
            message: error.message,
            response: error.response?.data,
        });
        return res.status(500).json({
            msg: "Transfer failed",
            error: error.response?.data || error.message
        });
    }
};
