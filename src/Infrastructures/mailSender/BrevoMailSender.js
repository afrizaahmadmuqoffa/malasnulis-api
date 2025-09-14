require('dotenv').config();
const { TransactionalEmailsApi, SendSmtpEmail } = require('@getbrevo/brevo');
const MailSender = require('../../Applications/mailSender/MailSender');

class BrevoEmailSender extends MailSender {
  constructor() {
    super();
    this._api = new TransactionalEmailsApi();

    this._api.authentications.apiKey.apiKey = process.env.SMTP_API_KEY;
  }

  async send(to, subject, text, htmlContent) {
    try {
      // Build message
      const message = new SendSmtpEmail();
      message.subject = subject;
      message.textContent = text;
      message.htmlContent = htmlContent;
      message.sender = {
        name: 'malasnulis',
        email: process.env.MAIL_FROM,
      };
      message.to = [{ email: to }];


      // Kirim email
      const res = await this._api.sendTransacEmail(message);

      console.log('✅ Email sent:', JSON.stringify(res.body));
      return res;
    } catch (err) {
      console.error('❌ Error sending email:', err.body || err.message);
      throw err;
    }
  }
}

module.exports = BrevoEmailSender;
