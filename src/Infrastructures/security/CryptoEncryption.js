const TokenGenerator = require('../../Applications/security/TokenGenerator.js');

class CryptoEncryption extends TokenGenerator {
  constructor(crypto) {
    super();
    this._crypto = crypto;
  }

  async generateToken(length) {
    return this._crypto.randomBytes(length).toString('hex');
  }

  async generateOtp(length) {
    const max = 10 ** length;

    const otp = this._crypto.randomInt(0, max);

    return otp.toString().padStart(length, '0');
  }
}

module.exports = CryptoEncryption;
