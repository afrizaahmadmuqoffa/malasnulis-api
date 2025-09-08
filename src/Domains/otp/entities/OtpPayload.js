class OtpPayload {
  constructor(payload) {
    this._verifyPayload(payload);

    this.email = payload.email;
    this.code = payload.code;
    this.expiresAt = payload.expiresAt;
  }

  _verifyPayload({ email, code, expiresAt }) {
    if (!email || !code || !expiresAt) {
      throw new Error('OTP_PAYLOAD.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof code !== 'string' || !(expiresAt instanceof Date) || isNaN(expiresAt.getTime())) {
      throw new Error('OTP_PAYLOAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error('OTP_PAYLOAD.INVALID_EMAIL_FORMAT');
    }
  }
}

module.exports = OtpPayload;