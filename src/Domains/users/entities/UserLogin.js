class UserLogin {
  constructor(payload) {
    this._verifyPayload(payload);

    this.email = payload.email;
    this.password = payload.password;
  }

  _verifyPayload({ email, password }) {

    if (!email || !password) {
      throw new Error('USER_LOGIN.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof email !== 'string' || typeof password !== 'string') {
      throw new Error('USER_LOGIN.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error('USER_LOGIN.INVALID_EMAIL_FORMAT');
    }
  }
}

module.exports = UserLogin;
