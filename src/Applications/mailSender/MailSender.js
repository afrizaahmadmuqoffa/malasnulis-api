/* eslint-disable no-unused-vars */
class MailSender {
  async send(to, subject, htmlContent, text) {
    throw new Error('MAIL_SENDER.METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = MailSender;
