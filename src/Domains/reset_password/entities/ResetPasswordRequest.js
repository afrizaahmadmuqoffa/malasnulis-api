class ResetPasswordRequest {
  constructor(payload) {
    this._verifyPayload(payload);
    const { email } = payload;
    this.email = email;
  }

  _verifyPayload({ email }) {
    if (!email) {
      throw new Error('RESET_PASSWORD_REQUEST.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof email !== 'string') {
      throw new Error('RESET_PASSWORD_REQUEST.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error('RESET_PASSWORD_REQUEST.INVALID_EMAIL_FORMAT');
    }
  }
}
module.exports = ResetPasswordRequest;
