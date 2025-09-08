const ResetPasswordRepository = require('../../Domains/reset_password/ResetPasswordRepository');

class ResetPasswordRepositoryPostgres extends ResetPasswordRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }
  async saveResetToken({ email, token, expiresAt }) {
    const id = `reset-${this._idGenerator()}`;
    const query = {
      text: 'INSERT INTO reset_tokens(id, token, user_email, expires_at) VALUES($1, $2, $3, $4)',
      values: [id, token, email, expiresAt],
    };
    await this._pool.query(query);
  }

  async getResetToken(token) {
    const query = {
      text: 'SELECT * FROM reset_tokens WHERE token = $1',
      values: [token],
    };

    const result = await this._pool.query(query);

    return result.rows[0];
  }

  async deleteToken(id) {
    const query = {
      text: 'DELETE FROM reset_tokens WHERE id = $1',
      values: [id],
    };

    await this._pool.query(query);
  }
}

module.exports = ResetPasswordRepositoryPostgres;
