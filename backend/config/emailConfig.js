"use strict";
const nodemailer = require("nodemailer");
require('dotenv').config()

const sendMail = ({ to, subject, html, text}) => {

  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  async function main() {

    const info = await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: to,
      subject: subject,
      text: text,
      html: html,
    });

    console.log("Message sent: %s", info.messageId);
  }

  main().catch(console.error);

}

module.exports = sendMail