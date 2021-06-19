const nodemailer = require("nodemailer");
require("dotenv").config();
const mailConfig = require("../config/mail");

class CreateNodemailSender {
  async send(msg) {
    const config = {
      host: "smtp.ukr.net",
      port: 465,
      secure: true,
      auth: {
        user: mailConfig.email.nodemailer,
        pass: process.env.PASSWORD,
      },
    };

    const transporter = nodemailer.createTransport(config);
    const emailOptions = {
      from: mailConfig.email.nodemailer,
      ...msg,
    };
    return await transporter.sendMail(emailOptions);
  }
}

module.exports = CreateNodemailSender;
