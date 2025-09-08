/* eslint-disable camelcase */
class UserDetail {
  constructor(payload) {
    this._verifyPayload(payload);

    const { id, email, is_verified } = payload;

    this.id = id;
    this.email = email;
    this.name =  this._extractName(email);
    this.color = this._getColorFromEmail(email);
    this.is_verified = is_verified;
  }

  _verifyPayload({ id, email }) {
    if (!id || !email) {
      throw new Error('USER_DETAIL.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof id !== 'string' ||  typeof email !== 'string') {
      throw new Error('USER_DETAIL.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }

  _extractName(email) {
    return email.split('@')[0];
  }

  _getColorFromEmail(email) {
    const palette = ['#FF5733', '#33C1FF', '#33FF57', '#FFC133', '#8D33FF', '#242424ff'];
    let hash = 0;
    for (let i = 0; i < email.length; i++) {
      hash = email.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % palette.length;
    return palette[index];
  }
}

module.exports = UserDetail;