require('dotenv').config();
const nodemailer = require('nodemailer');
const MailSender = require('../../Applications/mailSender/MailSender');

class NodemailerEmailSender extends MailSender {
  constructor() {
    super();
    this._transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async send(to, subject, text, htmlContent) {
    await this._transporter.sendMail({
      from: `"MalasNulis App" <${process.env.SMTP_USER}>`,
      to,
      subject,
      text,
      html: htmlContent,
    });
  }
}


module.exports = NodemailerEmailSender;