/* eslint-disable no-unused-vars */
class Hasher {
  async hash(password) {
    throw new Error('HASHER.HASH_METHOD_NOT_IMPLEMENTED');
  }

  async compare(plain, encrypted) {
    throw new Error('HASHER.COMPARE_METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = Hasher;
