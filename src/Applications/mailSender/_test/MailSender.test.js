/* eslint-disable no-undef */
const MailSender = require('../MailSender');

describe('MailSender interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    // Arrange
    const mailSender = new MailSender();

    // Action & Assert
    await expect(mailSender.sendMail('test@gmail.com', 'subject', '<h1>Test</h1>', 'content')).rejects.toThrow('MAIL_SENDER.METHOD_NOT_IMPLEMENTED');
  });
});
