/* eslint-disable camelcase */
const InvariantError = require('../../Commons/exceptions/InvariantError');
const NotFoundError = require('../../Commons/exceptions/NotFoundError');
const ContentDetail = require('../../Domains/contents/entities/ContentDetail');

class GetAllContentUseCase {
  constructor({ contentRepository }) {
    this._contentRepository = contentRepository;
  }

  async execute({ user_id, limit, page, sort, order, platform, type, tone, language }) {
    if (!user_id) throw new InvariantError('wajib menyertakan user id');

    const validSortBy = ['created_at', 'platform', 'type', 'tone', 'language'];
    if (sort && !validSortBy.includes(sort)) {
      throw new InvariantError('kolom sort tidak valid');
    }

    const sortOrder = order && order.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

    const contents = await this._contentRepository.getAllContent({
      user_id,
      limit: limit ? Number(limit) : 10,
      page: page ? Number(page) : 1,
      sort: sort || 'created_at',
      order: sortOrder,
      platform,
      type,
      tone,
      language,
    });

    if (!contents || contents.length === 0) throw new NotFoundError('belum ada konten');

    return contents.map((row) => new ContentDetail({ ...row }));
  }
}

module.exports = GetAllContentUseCase;
