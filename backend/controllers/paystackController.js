const crypto = require('crypto');
const BuyCrypto = require('../models').exchangeBuys;
const BankWithdraw = require('../models').withdrawals
const Wallet = require('../models').wallets
const User = require('../models').users;
const { ServerError, formatToUserTimezone, webURL, nairaSign, dollarSign } = require('../utils/utils');
require('dotenv').config();
const secret = process.env.PAYSTACK_SECRET;
const axios = require('axios');
const otpGenerator = require('otp-generator');
const Product = require('../models').products
const ProductOrder = require('../models').productOrders
const { sequelize } = require('../models');
const PAYSTACK_URL = 'https://api.paystack.co';
const moment = require('moment');
const Mailing = require('../config/emailDesign');
const { Op } = require('sequelize');
const Notification = require('../models').notifications

const isproduction = process.env.NODE_ENV === 'production'

const confirmOrDeclineProductPayment = async (status, reference) => {
    console.log(`details received`, status, reference)

    try {
        const productTransaction = await ProductOrder.findOne({ where: { reference } });

        if (!productTransaction) {
            console.log('product reference not found')
            return { success: false, msg: "Product transaction not found" };
        }

        if (productTransaction.status === "paid" || productTransaction.status === "failed") {
            console.log('product already marked paid')
            return { success: true, msg: `Transaction already marked as ${productTransaction.status}` };
        }
        const amt = parseInt(productTransaction.amount_paid)
        const amtformat = amt.toLocaleString()
        const productsArray = Array.isArray(productTransaction.products) ? productTransaction.products : [productTransaction.products];
        if (status === "success") {
            productTransaction.status = "paid";
            await productTransaction.save();
            console.log('product marked as paid and saved')
            const buyer = { email: productTransaction.email_address }
            try {
                await Mailing({
                    subject: 'New Order Purchase',
                    eTitle: 'Order Purchase Successful',
                    eBody: `
                        <div style="color: white;">
                            <p>Thank you for your payment. Your order <strong>#${productTransaction.gen_id}</strong> for ${productsArray.length} product(s) has been successfully processed and confirmed.</p>
                            <p>Total amount: <strong>₦${amtformat}</strong></p>
                            
                            <p style="margin-top: 10px;color: white;">Your tool will be delivered to your email within<strong> 48 hours</strong></p>
                            
                            <p style="margin: 10px 0px;color: white;">
                            If you haven't received your tool after 48 hours, please 
                            <a href="https://api.whatsapp.com/send?phone=2348106149391&text=Hi+MonieQuest,+I+made+a+payment+over+48hrs+ago+but+haven't+received+the+tool+yet.+My+email+is+" target="_blank" style="color: #25D366; text-decoration: underline;">
                            click here to chat with support on WhatsApp</a>.
                            </p>

                            <p style="margin-top: 10px; color: white;">We appreciate your purchase! Don't forget — there's always another tool ready to take your progress even further.</p>
                            <p style="margin-top: 20px; color:white">Thank you for your purchase!</p>
                        </div>
                    `,
                    account: buyer
                });
                console.log('Email sent successfully');
            } catch (error) {
                console.error('Error while sending email:', error);
            }
            return { success: true, msg: "Product transaction marked as paid" };
        }



        else if (status === "failed") {
            productTransaction.status = "failed";
            await productTransaction.save();
            console.log('product marked as paid and saved')
            return { success: true, msg: "Product transaction marked as failed" };
        }


        else {
            console.log('product status unknown')
            return { success: false, msg: "Unknown status type passed" };
        }

    } catch (error) {
        return { success: false, msg: "Internal server error", error: error.message };
    }
};

// Handle Crypto Buy Payment
const handleCryptoBuyPayment = async (status, reference, data) => {
    try {
        const { amount } = data;
        const newAmt = amount / 100;

        let transaction = await BuyCrypto.findOne({
            where: { reference },
            include: [
                {
                    model: User, as: 'crypto_buyer'
                }
            ]
        });

        console.log(transaction?.crypto_buyer?.email)
        if (!transaction) {
            if (!transaction) {
                console.log(`❌ Crypto transaction not found: ${reference}`);
                return { success: false, msg: "Transaction not found" };
            }
        }

        if (status === "success") {
            if (transaction.status === "paid") {
                console.log(`✅ Crypto transaction ${reference} already marked as paid.`);
                return { success: true, msg: "Transaction already processed", data: transaction };
            }

            transaction.amount_in_naira = parseFloat(newAmt);
            transaction.status = "paid";
            transaction.url = null
            await transaction.save();
            const buyer = { email: transaction?.crypto_buyer?.email }
            await Notification.create({
                user: transaction?.userid,
                title: 'Crypto Purchase Successful',
                content: `Your payment of ₦${newAmt.toLocaleString()} is succesful  `,
                url: `/user/transactions_history`
            })
            try {

                await Mailing({
                    subject: 'Crypto Purchase Successful',
                    eTitle: 'Crypto Order Purchase Confirmed',
                    eBody: `
                        <div style="color: white;">
                            <p>Thank you for your payment of ₦${newAmt.toLocaleString()} which has been successfully processed and confirmed. please allow upto 1hr for your ${transaction?.crypto_currency} asset to be sent to your wallet ending in ****${transaction?.wallet_address.slice(-5)}.</p>
                             <p style="margin-top: 20px;">Thank you for your purchase!</p>
                        </div>
                    `,
                    account: buyer
                });
                console.log('Email sent successfully');
            } catch (error) {
                console.error('Error while sending email:', error);
            }

            console.log(`✅ Crypto transaction reference ${reference} updated successfully.`);
            return { success: true, msg: "Crypto transaction marked as paid successfully", data: transaction };
        } else {
            transaction.status = "failed";
            await transaction.save();
            return { success: true, msg: "Crypto transaction failed", data: transaction };
        }
    } catch (error) {
        console.error("Error handling crypto buy payment:", error);
        return { success: false, msg: `Error processing crypto payment: ${error.message}` };
    }
};

// Handle Bank Withdrawal
const handleBankWithdrawal = async (status, reference) => {
    try {
        const withdrawal = await BankWithdraw.findOne({
            where: { reference_id: reference },
            include: [{ model: User, as: "user_withdrawal" }]
        });

        if (!withdrawal) {
            return { success: false, msg: "Withdrawal transaction not found" };
        }
        const amt = parseInt(withdrawal?.amount).toLocaleString()
        const user = { email: withdrawal?.user_withdrawal?.email, firstname: withdrawal?.user_withdrawal?.first_name }
        console.log(`status:`, status)
        if (status === "success") {
            withdrawal.status = "completed";
            withdrawal.transfer_status = 'completed';
            await withdrawal.save();


            await Notification.create({
                user: withdrawal?.userid,
                title: 'Bank wihdrawal Successful',
                content: `Your bank withdrawal of ₦${amt} is succesful.  `,
                url: `/user/transactions_history`
            })
            await Mailing({
                subject: 'Bank Withdrawal',
                eTitle: `Bank Withdrawal Successful`,
                eBody: `
                 <div style="font-size: 2rem">Hi ${user.firstname},</div>
                 <div style="margin-top: 1.5rem">Your withdrawal of ₦${amt} is successful and has been sent to your local bank account ending in *****${withdrawal?.account_number.slice(-5)}. Kindly login to your ${withdrawal?.bank_name} to check your balance. Thank you for choosing us.</div>
                `,
                account: user,
            })
            return { success: true, msg: "Bank withdrawal approved", data: withdrawal };
        } else {
            try {
                // Find the user's wallet
                const findWallet = await Wallet.findOne({ where: { user: withdrawal?.user_withdrawal.id } });

                if (!findWallet) {
                    return { success: false, msg: "User wallet not found for reverse" };
                }

                // Start a database transaction
                await sequelize.transaction(async (t) => {
                    // Reverse the funds
                    findWallet.total_outflow = parseFloat(findWallet.total_outflow || 0) - parseFloat(withdrawal?.amount);
                    findWallet.balance = parseFloat(findWallet.balance || 0) + parseFloat(withdrawal.amount);
                    await findWallet.save({ transaction: t });

                    // Update withdrawal status
                    withdrawal.status = "failed";
                    await withdrawal.save({ transaction: t });
                });

                await Notification.create({
                    user: withdrawal?.userid,
                    title: 'Bank wihdrawal Failed',
                    content: `Your bank withdrawal of ₦${amt} is unsuccesful  `,
                    url: `/user/transactions_history`
                })
                await Mailing({
                    subject: 'Bank Withdrawal',
                    eTitle: `Bank Withdrawal Failed`,
                    eBody: `
                     <div style="font-size: 2rem">Hi ${user.firstname},</div>
                     <div style="margin-top: 1.5rem">Your withdrawal of ₦${amt} is unsuccessful and has been reverted to your Moniequest account, kindly contact support to learn more. Thank you for choosing us.</div>
                    `,
                    account: user,
                })
                return { success: true, msg: "Bank withdrawal failed and funds reversed", data: withdrawal };
            } catch (error) {
                console.error("Error handling failed transfer:", error);
                return { success: false, msg: `Error processing failed transfer: ${error.message}` };
            }
        }
    } catch (error) {
        console.error("Error handling bank withdrawal:", error);
        return { success: false, msg: `Error processing bank withdrawal: ${error.message}` };
    }
};




// Main webhook handler function
exports.handleWebhook = async (req, res) => {
    try {
        const hash = crypto.createHmac('sha512', secret)
            .update(JSON.stringify(req.body))
            .digest('hex');

        if (hash !== req.headers['x-paystack-signature']) {
            return res.status(400).json({ msg: "Invalid signature" });
        }

        const event = req.body;
        console.log(`🔔 Webhook received: ${event.event}`);

        if (!event?.data || !event?.event) {
            return res.status(400).json({ msg: "Invalid webhook data" });
        }

        const { event: eventType, data } = event;
        const { reference } = data;
        const narration = data?.metadata?.narration;

        // 🟢 Handle incoming payments (charge.success)
        if (eventType === "charge.success") {
            if (narration === "product-purchase") {
                const result = await confirmOrDeclineProductPayment("success", reference);
                return res.status(result.success ? 200 : 400).json({ msg: result.msg });
            }

            if (narration === "p2p_buy") {
                const result = await handleCryptoBuyPayment("success", reference, data);
                return res.status(result.success ? 200 : 400).json({ msg: result.msg, data: result.data });
            }
        }

        // Handle failed charges
        if (eventType === "charge.failed") {
            if (narration === "product-purchase") {
                const result = await confirmOrDeclineProductPayment("failed", reference);
                return res.status(result.success ? 200 : 400).json({ msg: result.msg });
            }

            if (narration === "p2p_buy") {
                const result = await handleCryptoBuyPayment("failed", reference, data);
                return res.status(result.success ? 200 : 400).json({ msg: result.msg });
            }
        }

        // 🔁 Handle transfers (outgoing payouts)
        if (eventType === "transfer.success" || eventType === "transfer.failed") {
            const status = eventType === "transfer.success" ? "success" : "failed";
            const result = await handleBankWithdrawal(status, reference);
            return res.status(result.success ? 200 : 400).json({ msg: result.msg, data: result.data });
        }


        console.log(`⚠️ Unhandled webhook event or narration: ${eventType} / ${narration}`);
        return res.status(400).json({ msg: "Unhandled webhook type or narration" });

    } catch (error) {
        console.error("❌ Error processing webhook:", error.message);
        return res.status(500).json({ msg: "Internal server error" });
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
            reference: reference,
            metadata: {
                narration: 'p2p_buy'
            },
            callback_url: isproduction ? 'https://moniequest-front.vercel.app/user/exchange/buy/verify_payment' :
                'http://localhost:5173/user/exchange/buy/verify_payment'
        };

        try {
            // Send request to Paystack
            const response = await axios.post(`https://api.paystack.co/transaction/initialize`, payload, {
                headers: {
                    Authorization: `Bearer ${secret}`,
                    "Content-Type": 'application/json'
                }
            });

            // Return response data if successful
            findOrder.url = response.data.data?.authorization_url
            findOrder.status = 'initialized'
            await findOrder.save()
            return res.json({ status: 200, msg: 'Payment initialized', data: response.data });
        } catch (error) {
            // Handle Paystack API error
            console.error('Error from Paystack:', error.response ? error.response.data : error.message);
            return res.json({ status: 500, msg: "Error initializing payment", error: error.message });
        }

    } catch (error) {
        // General error handler
        ServerError(res, error);
        console.error("Error initializing crypto payment:", error.message);
    }
};



exports.InitializeProductBuyPayment = async (req, res) => {
    try {
        const { email_address, total_price, total_discount, products, amount_paid } = req.body;

        if (!email_address || !total_price || !products || !amount_paid || products.length < 1) {
            return res.json({ status: 400, msg: "Invalid payment request" });
        }

        if (isNaN(total_price) || isNaN(total_discount) || isNaN(amount_paid)) {
            return res.json({ status: 404, msg: "Prices must be in numbers" });
        }

        const unlistedProducts = await Product.findAll({ where: { listing: 'unlisted' } });
        const foundInCart = unlistedProducts.some(ele => products.some(item => item.id === ele.id));
        if (foundInCart) {
            return res.json({ status: 404, msg: `Product(s) in your cart are no longer listed for purchase, kindly re-add them and try again` });
        }

        const productsArray = Array.isArray(products) ? products : [products];
        const gen_id = `mq_${crypto.randomBytes(8).toString("hex")}`;
        const reference = `PR_${crypto.randomBytes(8).toString("hex")}`;
        const productOrder = await ProductOrder.create({
            gen_id,
            reference,
            email_address,
            total_price,
            total_discount,
            amount_paid,
            products: productsArray,
            status: 'initialized'
        });

        const buyer = { email: productOrder.email_address };
        const nairaSign = '₦';


        const payload = {
            email: productOrder.email_address,
            amount: amount_paid * 100,
            reference,
            metadata: {
                order_id: productOrder.gen_id,
                narration: "product-purchase"
            },
            callback_url: isproduction ? `https://moniequest-front.vercel.app/payment_status` :
                `http://localhost:5173/payment_status`
        };

        const response = await axios.post('https://api.paystack.co/transaction/initialize', payload, {
            headers: {
                Authorization: `Bearer ${secret}`,
                "Content-Type": 'application/json'
            }
        });

        const data = response.data;

        await Mailing({
            subject: 'New Order Placed',
            eTitle: 'Order placed',
            eBody: `
               <div style="color: white;">
                   You have successfully placed an order with the ID (#${productOrder.gen_id}) for ${productsArray.length} product(s). A total amount of ${nairaSign}${productOrder.amount_paid.toLocaleString()} is to be made. If you didn’t proceed from the website to make payments, click the link below to continue: <a href="${data.data.authorization_url}" style="text-decoration: underline; color: #00fe5e">click here</a>
                     <br>
                   <span style="font-style: italic; margin-top: 10px; display: block; color: white;">Note:</span>
                     NB: If you did proceed from the website to make payments, kindly ignore this email. 
                   If you didn't, kindly follow the link above as it will expire in 20 minutes.
                </div>`,

            account: buyer
        });

        const formattedTime = formatToUserTimezone(productOrder.createdAt);
        const admins = await User.findAll({ where: { role: { [Op.in]: ['admin', 'super admin'] } } });

        if (admins && admins.length > 0) {
            admins.map(async ele => {
                await Notification.create({
                    user: ele.id,
                    title: 'Product order alert',
                    content: `Hello Admin, a new product order with ID (#${productOrder.gen_id}) for ${productsArray.length} product(s) totaling ${nairaSign}${productOrder.amount_paid.toLocaleString()} has been initialized. Order was placed on ${moment(productOrder.createdAt).format('DD-MM-yyyy')} at ${formattedTime}`,
                    url: '/admin/products/orders',
                });

                await Mailing({
                    subject: 'Product Order Alert',
                    eTitle: 'Product order placed',
                    eBody: `
                        <div style="color:white ;font-size: 0.85rem; margin-top: 0.5rem"><span style="font-style: italic">order ID:</span><span style="padding-left: 1rem">#${productOrder.gen_id}</span></div>
                        <div style="color:white ;font-size: 0.85rem; margin-top: 0.5rem"><span style="font-style: italic">product(s) purchased:</span><span style="padding-left: 1rem">${productsArray.length}</span></div>
                        <div style="color:white ;font-size: 0.85rem; margin-top: 0.5rem"><span style="font-style: italic">amount to be paid:</span><span style="padding-left: 1rem">${nairaSign}${productOrder.amount_paid.toLocaleString()}</span></div>
                        <div style="color:white ;font-size: 0.85rem; margin-top: 0.5rem"><span style="font-style: italic">payment method:</span><span style="padding-left: 1rem">Paystack</span></div>
                        <div style="color:white ;font-size: 0.85rem; margin-top: 0.5rem"><span style="font-style: italic">payment status:</span><span style="padding-left: 1rem">${productOrder.status}</span></div>
                        <div style="color:white ;font-size: 0.85rem; margin-top: 0.5rem"><span style="font-style: italic">buyer's email:</span><span style="padding-left: 1rem">${productOrder.email_address}</span></div>
                        <div style="color:white ;font-size: 0.85rem; margin-top: 0.5rem"><span style="font-style: italic">date:</span><span style="padding-left: 1rem">${moment(productOrder.createdAt).format('DD-MM-yyyy')}</span></div>
                        <div style="color:white ;font-size: 0.85rem; margin-top: 0.5rem"><span style="font-style: italic">time:</span><span style="padding-left: 1rem">${formattedTime}</span></div>
                        <div style="color:white ;margin-top: 1rem">See more details <a href='${webURL}/admin/products/orders' style="text-decoration: underline; color: #00fe5e">here</a></div>`,
                    account: ele
                });
            });
        }

        return res.json({ status: 200, msg: "Product payment initialized", data });

    } catch (error) {
        console.error("🔥 Error initializing product payment:", error.message);
        return res.status(500).json({ status: 500, msg: "Internal server error", error: error.message });
    }
};



exports.checkPaymentStatus = async (req, res) => {
    try {
        const { reference } = req.body;
        if (!reference) return res.json({ status: 400, msg: "Transaction reference missing" });

        // Verify payment from Paystack
        const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
            headers: {
                Authorization: `Bearer ${secret}`,
                "Content-Type": "application/json"
            }
        });

        const paymentData = response.data.data;
        if (paymentData.status !== "success") {
            return res.json({ status: 400, msg: "Payment not successful", data: reference });
        }

        // Payment successful on Paystack
        const findProductReference = await ProductOrder.findOne({ where: { reference } });
        if (!findProductReference) return res.json({ status: 404, msg: "Order reference not found" });

        let prodStatus;
        if (findProductReference.status === 'paid') {
            prodStatus = true;
            const amt = parseInt(findProductReference.amount_paid)
            // const amtformat = amt.toLocaleString()
            // const productsArray = Array.isArray(findProductReference.products) ? findProductReference.products : [findProductReference.products]
            // const buyer = {email:findProductReference.email_address}
            // try {
            //     await Mailing({
            //         subject: 'New Order Purchase',
            //         eTitle: 'Order Purchase Successful',
            //         eBody: `
            //             <div style="color: white;">
            //                 <p>Thank you for your payment. Your order <strong>#${findProductReference.gen_id}</strong> for ${productsArray.length} product(s) has been successfully processed and confirmed.</p>
            //                 <p>Total amount: <strong>₦${amtformat}</strong></p>

            //                 <p style="margin-top: 20px;">Your tool will be delivered to your email within<strong> 48 hours</strong></p>


            //                 <p style="margin-top: 20px;">We appreciate your purchase! Don't forget — there's always another tool ready to take your progress even further.</p>
            //                 <p style="margin-top: 20px; color:white">Thank you for your purchase!</p>
            //             </div>
            //         `,
            //         account: buyer
            //     });
            //     console.log('Email sent successfully');
            // } catch (error) {
            //     console.error('Error while sending email:', error);
            // }
        } else {
            prodStatus = false;
        }

        return res.json({ status: 200, prodstatus: prodStatus, msg: "Payment confirmed", data: reference });

    } catch (error) {
        console.error(error.response ? error.response.data : error.message);
        ServerError(res, error);
    }
};




exports.checkCryptoPaymentStatus = async (req, res) => {
    try {
        const { reference } = req.body;
        if (!reference) return res.json({ status: 400, msg: "Transaction reference missing" });

        // Verify payment from Paystack
        const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
            headers: {
                Authorization: `Bearer ${secret}`,
                "Content-Type": "application/json"
            }
        });

        const paymentData = response.data.data;
        if (paymentData.status !== "success") {
            return res.json({ status: 400, msg: "Payment not successful", data: reference });
        }

        // Payment successful on Paystack
        const findProductReference = await BuyCrypto.findOne({ where: { reference } });
        if (!findProductReference) return res.json({ status: 404, msg: "Order reference not found" });


        let prodStatus;
        if (findProductReference.status === 'paid') {
            prodStatus = true
        } else {
            prodStatus = false
        }

        return res.json({ status: 200, prodstatus: prodStatus, msg: "Payment confirmed", data: reference });

    } catch (error) {
        console.error(error.response ? error.response.data : error.message);
        ServerError(res, error);
    }
}





/**
 * @desc Admin initiates a transfer to a user
 * @route POST /admin/transfer
 * @access Admin
 */




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
                reference: `TRANS_${crypto.randomBytes(8).toString("hex")}`,
                metadata: {
                    narration: 'transfer'
                }
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

exports.checkAccount = async (req, res) => {
    try {
        const { account_number, bank } = req.body
        if (!account_number || !bank) return res.json({ status: 404, msg: "Incomplete request " })
        const banksResponse = await axios.get("https://api.paystack.co/bank", {
            headers: {
                Authorization: `Bearer ${secret}`,
                "Content-Type": "application/json"
            }
        });
        const banks = banksResponse.data.data;
        const userbank = banks.find(b => b.name.toLowerCase() === bank.toLowerCase());

        if (!userbank) {
            return res.json({ status: 404, msg: "Bank not supported" });
        }
        try {
            const Verifyresponse = await axios.get('https://api.paystack.co/bank/resolve', {
                params: {
                    account_number: account_number,
                    bank_code: userbank.code
                },
                headers: {
                    Authorization: `Bearer ${secret}`
                }
            });
            return res.json({ status: 200, msg: "Account verified", data: Verifyresponse.data.data });
        } catch (error) {
            console.error('Verification failed:', error.response?.data || error.message);
            return res.json({ status: 404, msg: "Account not found", data: error.response?.data || error.message });
        }
    } catch (error) {
        return res.json({ status: 500, msg: "Error", data: error.response?.data || error.message });

    }
}

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
