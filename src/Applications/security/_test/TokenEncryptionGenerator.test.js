/* eslint-disable no-undef */
const TokenEncryptionGenerator = require('../TokenEncryptionGenerator.js');

describe('TokenEncryptionGenerator interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    // Arrange
    const tokenEncryptionGenerator = new TokenEncryptionGenerator();

    // Action & Assert
    await expect(tokenEncryptionGenerator.generateToken(32)).rejects.toThrow('RANDOM_TOKEN_ENCRYPTION.METHOD_NOT_IMPLEMENTED');
    await expect(tokenEncryptionGenerator.generateOtp(6)).rejects.toThrow('RANDOM_TOKEN_ENCRYPTION.METHOD_NOT_IMPLEMENTED');
  });
});
