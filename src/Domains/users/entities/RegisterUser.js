class RegisterUser {
  constructor(payload) {
    this._verifyPayload(payload);

    const { password, email } = payload;

    this.password = password;
    this.email = email;
  }

  _verifyPayload({ password, email }) {
    if (!password || !email) {
      throw new Error('REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof password !== 'string' || typeof email !== 'string') {
      throw new Error('REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }

    if (password.length < 8){
      throw new Error('REGISTER_USER.NOT_MEET_MINIMUM_PASSWORD');
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error('REGISTER_USER.INVALID_EMAIL_FORMAT');
    }
  }
}

module.exports = RegisterUser;