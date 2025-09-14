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

  async getAllContent({
    user_id,
    limit = 10,
    page = 1,
    sort_by = 'created_at',
    order = 'DESC',
    platform,
    type,
    tone,
    language
  }) {
    const offset = (page - 1) * limit;

    // base query
    let text = `
    SELECT id, platform, type, tone, language, input_prompt, generated_content, created_at
    FROM contents
    WHERE user_id = $1
  `;
    const values = [user_id];
    let idx = 2;

    // filter dinamis
    if (platform) {
      text += ` AND platform = $${idx++}`;
      values.push(platform);
    }
    if (type) {
      text += ` AND type = $${idx++}`;
      values.push(type);
    }
    if (tone) {
      text += ` AND tone = $${idx++}`;
      values.push(tone);
    }
    if (language) {
      text += ` AND language = $${idx++}`;
      values.push(language);
    }

    // sort & pagination
    text += ` ORDER BY ${sort_by} ${order} LIMIT $${idx++} OFFSET $${idx}`;
    values.push(limit, offset);

    const result = await this._pool.query({ text, values });
    return result.rows;
  }

  async deleteContentById({ id, user_id }){
    const query = {
      text: 'DELETE FROM contents WHERE id = $1 AND user_id = $2 RETURNING id',
      values: [id, user_id],
    };

    const result = await this._pool.query(query);

    return result.rowCount > 0;
  }

}

module.exports = ContentRepositoryPostgres;
