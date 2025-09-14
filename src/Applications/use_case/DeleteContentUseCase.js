/* eslint-disable camelcase */
const InvariantError = require('../../Commons/exceptions/InvariantError');
const NotFoundError = require('../../Commons/exceptions/NotFoundError');

class DeleteContentUseCase {
  constructor({ contentRepository }) {
    this._contentRepository = contentRepository;
  }

  async execute({ content_id, user_id }) {
    if (!content_id) throw new InvariantError('wajib menyertakan id konten');
    if (!user_id) throw new InvariantError('wajib menyertakan user id');

    const content = await this._contentRepository.deleteContentById({ user_id, id: content_id });
    if (!content) throw new NotFoundError('konten tidak ditemukan');
  }
}

module.exports = DeleteContentUseCase;
