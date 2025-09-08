const InvariantError = require('../../Commons/exceptions/InvariantError');
const NotFoundError = require('../../Commons/exceptions/NotFoundError');
const UserRepository = require('../../Domains/users/UserRepository');

class UserRepositoryPostgres extends UserRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async verifyAvailableEmail(email) {
    const query = {
      text: 'SELECT 1 FROM users WHERE email = $1',
      values: [email],
    };

    const result = await this._pool.query(query);

    if (result.rowCount > 0) {
      throw new InvariantError('email sudah digunakan');
    }
  }

  async isUserExist({ email, id }) {
    let query;

    if (email) {
      query = {
        text: 'SELECT 1 FROM users WHERE email = $1',
        values: [email],
      };
    } else if (id) {
      query = {
        text: 'SELECT 1 FROM users WHERE id = $1',
        values: [id],
      };
    }

    const result = await this._pool.query(query);
    return result.rowCount > 0;
  }

  async addUser({ password, email }) {
    const id = `user-${this._idGenerator()}`;

    const query = {
      text: 'INSERT INTO users(id, email, password) VALUES($1, $2, $3) RETURNING id, email, is_verified',
      values: [id, email, password],
    };

    try {
      const result = await this._pool.query(query);
      return result.rows[0];
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      throw new InvariantError('gagal menambahkan user');
    }
  }

  async verifyUser(email){
    const query = {
      text: 'UPDATE users SET is_verified = TRUE WHERE email = $1 RETURNING id, email, is_verified',
      values: [email],
    };

    try {
      const result = await this._pool.query(query);
      return result.rows[0];
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      throw new InvariantError('gagal verifikasi user');
    }
  }

  async getPasswordByEmail(email) {
    const query = {
      text: 'SELECT password FROM users WHERE email = $1',
      values: [email],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('email tidak ditemukan');
    }

    return result.rows[0].password;
  }

  async getIdByEmail(email) {
    const query = {
      text: 'SELECT id FROM users WHERE email = $1',
      values: [email],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('akun tidak ditemukan');
    }

    const { id } = result.rows[0];

    return id;
  }

  async getUserDetailById(userId){
    const query = {
      text: 'SELECT id, email, is_verified FROM users WHERE id = $1',
      values: [userId],
    };

    const result = await this._pool.query(query);

    return result.rows[0];
  }

  async changePassword({ email, hashedPassword }) {
    const query = {
      text: 'UPDATE users SET password = $1 WHERE email = $2',
      values: [hashedPassword, email],
    };

    await this._pool.query(query);
  }

}

module.exports = UserRepositoryPostgres;
