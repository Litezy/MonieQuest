const crypto = require('crypto');

const secret = 'sk_test_ebcac68b6857b8ab2bf2e9bf6b665b8fecc2cbeb'; 
const samplePayload = {
    event: "charge.success",
    data: {
        id: 123456789,
        amount: 500000,
        currency: "NGN",
        status: "success",
        reference: "test_1234",
        customer: {
            email: "test@example.com"
        }
    }
};

const hash = crypto
    .createHmac('sha512', secret)
    .update(JSON.stringify(samplePayload)) 
    .digest('hex');

console.log("Generated Signature:", hash);
