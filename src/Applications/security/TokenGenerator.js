/* eslint-disable no-unused-vars */
class TokenGenerator {
  async generateToken(length) {
    throw new Error('TOKEN_ENCRYPTION.METHOD_NOT_IMPLEMENTED');
  }

  async generateOtp(length) {
    throw new Error('TOKEN_ENCRYPTION.METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = TokenGenerator;
