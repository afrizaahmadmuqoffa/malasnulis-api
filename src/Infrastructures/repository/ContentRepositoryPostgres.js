/* eslint-disable camelcase */
const InvariantError = require('../../Commons/exceptions/InvariantError');
const ContentRepository = require('../../Domains/contents/ContentRepository');

class ContentRepositoryPostgres extends ContentRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addContent({ user_id, platform, type, tone, language, input_prompt, generated_content }) {
    console.log(generated_content);
    const id = `content-${this._idGenerator()}`;

    const query = {
      text: `
        INSERT INTO contents (id, user_id, platform, type, tone, language, input_prompt, generated_content)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8::jsonb)
        RETURNING id, platform, type, tone, language, input_prompt, generated_content, created_at
      `,
      values: [id, user_id, platform, type, tone, language, input_prompt, JSON.stringify(generated_content)],
    };

    try {
      const result = await this._pool.query(query);
      return result.rows[0];
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      throw new InvariantError('gagal menambahkan konten');
    }
  }

  async getContentDetailById({ id, user_id }){
    console.log(id, user_id);
    const query = {
      text: 'SELECT id, platform, type, tone, language, input_prompt, generated_content, created_at FROM contents WHERE id = $1 AND user_id = $2',
      values: [id, user_id],
    };

    const result = await this._pool.query(query);

    return result.rows[0];
  }

}

module.exports = ContentRepositoryPostgres;
