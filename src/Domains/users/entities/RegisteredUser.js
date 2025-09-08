/* eslint-disable camelcase */
class RegisteredUser {
  constructor(payload) {
    this._verifyPayload(payload);

    const { id, email, is_verified } = payload;

    this.id = id;
    this.email = email;
    this.is_verified = is_verified;
  }

  _verifyPayload({ id, email, is_verified }) {
    if (!id || !email || is_verified === undefined) {
      throw new Error('REGISTERED_USER.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof id !== 'string' || typeof email !== 'string' || typeof is_verified !== 'boolean') {
      throw new Error('REGISTERED_USER.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = RegisteredUser;