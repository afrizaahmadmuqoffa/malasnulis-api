/* eslint-disable camelcase */
const InvariantError = require('../../Commons/exceptions/InvariantError');
const NotFoundError = require('../../Commons/exceptions/NotFoundError');
const ContentDetail = require('../../Domains/contents/entities/ContentDetail');

class GetContentDetailUseCase {
  constructor({ contentRepository }) {
    this._contentRepository = contentRepository;
  }

  async execute({ content_id, user_id }) {
    if (!content_id) throw new InvariantError('wajib menyertakan id konten');
    if (!user_id) throw new InvariantError('wajib menyertakan user id');

    const content = await this._contentRepository.getContentDetailById({ user_id, id: content_id });
    if (!content) throw new NotFoundError('konten tidak ditemukan');

    return new ContentDetail(content);
  }
}

module.exports = GetContentDetailUseCase;
