const OtpRepository = require('../../Domains/users/UserRepository');

class OtpRepositoryPostgres extends OtpRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async saveOtp({ email, code, expiresAt }) {
    const id = `otp-${this._idGenerator()}`;

    const query = {
      text: 'INSERT INTO otps(id, code, user_email, expires_at) VALUES($1, $2, $3, $4)',
      values: [id, code, email, expiresAt],
    };

    try {
      await this._pool.query(query);
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      throw new Error('gagal menambahkan otp');
    }
  }

  async getOtp(email) {
    const query = {
      text: 'SELECT * FROM otps WHERE user_email=$1 ORDER BY created_at DESC LIMIT 1',
      values: [email],
    };
    const result = await this._pool.query(query);

    return result.rows[0];
  }


  async incrementAttempt(id) {
    console.log('repo: ', id);
    const query = {
      text: 'UPDATE otps SET attempt = attempt + 1 WHERE id=$1',
      values: [id]
    };
    await this._pool.query(query);
  }

  async deleteOtp(id) {
    const query = {
      text: 'DELETE FROM otps WHERE id=$1',
      values: [id]
    };
    await this._pool.query(query);
  }

  async getOtpStats(email) {
    console.log('repo: ', email);
    const query = {
      text: `SELECT
         COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '1 minute') as last_minute,
         COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '1 hour') as last_hour,
         COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '1 day') as last_day
       FROM otps
       WHERE user_email=$1`,
      values: [email]
    };
    const result = await this._pool.query(query);
    console.log('repo: ', result.rows);
    return result.rows[0];
  }

}

module.exports = OtpRepositoryPostgres;
