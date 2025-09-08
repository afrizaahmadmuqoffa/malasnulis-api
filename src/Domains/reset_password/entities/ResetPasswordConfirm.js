class ResetPasswordConfirm {
  constructor(payload) {
    this._verifyPayload(payload);

    this.token = payload.token;
    this.newPassword = payload.newPassword;
  }

  _verifyPayload({ token, newPassword }) {
    if (!token || !newPassword) {
      throw new Error('RESET_PASSWORD_CONFIRM.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof token !== 'string' || typeof newPassword !== 'string') {
      throw new Error('RESET_PASSWORD_CONFIRM.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }

    if (newPassword.length < 8) {
      throw new Error('RESET_PASSWORD_CONFIRM.NOT_MEET_MINIMUM_PASSWORD');
    }
  }
}

module.exports = ResetPasswordConfirm;
