const axios = require("axios");
require("dotenv").config();
const secret = process.env.PAYSTACK_SECRET;

const verifyBankAccount = async (account_number, bank_name) => {
    if (!account_number || !bank_name) {
        return { success: false, msg: "Incomplete request" };
    }

    try {
        // Fetch list of banks
        const banksResponse = await axios.get("https://api.paystack.co/bank", {
            headers: {
                Authorization: `Bearer ${secret}`,
                "Content-Type": "application/json"
            }
        });

        const banks = banksResponse.data.data;
        const userBank = banks.find(b => b.name.toLowerCase() === bank_name.toLowerCase());

        if (!userBank) {
            return { success: false, msg: "Bank not supported" };
        }

        // Resolve account number
        const verifyResponse = await axios.get("https://api.paystack.co/bank/resolve", {
            params: {
                account_number,
                bank_code: userBank.code
            },
            headers: {
                Authorization: `Bearer ${secret}`
            }
        });

        return { success: true, msg: "Account verified", data: verifyResponse.data.data };

    } catch (error) {
        const message = error.response?.data?.message || error.message;
        return { success: false, msg: "Account verification failed", error: message };
    }
};

module.exports = verifyBankAccount;
