const Hasher = require('../../Applications/security/Hasher');

class BcryptHash extends Hasher {
  constructor(bcrypt, saltRound = 10) {
    super();
    this._bcrypt = bcrypt;
    this._saltRound = saltRound;
  }

  async hash(plain) {
    return this._bcrypt.hash(plain, this._saltRound);
  }

  async compare(plain, hashed) {
    const result = await this._bcrypt.compare(plain, hashed);

    return result;
  }
}

module.exports = BcryptHash;
