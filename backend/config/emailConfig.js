"use strict";
const nodemailer = require("nodemailer");

const sendMail = ({ to, subject, html, text }) => {
  const transporter = nodemailer.createTransport({
    host: "da6.host-ww.net",      
    port: 465,                        
    secure: true,                    
    auth: {
      user: "support@moniequest.com",   
      pass: "Moniequestmail@123",      
    },
  });

  async function main() { 
    const info = await transporter.sendMail({
      from: '"Moniequest Support" <support@moniequest.com>', // Sender name + email
      to: to,
      subject: subject,
      text: text,
      html: html,
    });

    console.log("✅ Email sent:", info.messageId);
  }

  main().catch(console.error);
};

module.exports = sendMail;
