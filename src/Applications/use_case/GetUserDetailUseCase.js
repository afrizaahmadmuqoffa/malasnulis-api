const InvariantError = require('../../Commons/exceptions/InvariantError');
const NotFoundError = require('../../Commons/exceptions/NotFoundError');
const UserDetail = require('../../Domains/users/entities/UserDetail');

class GetUserDetailUseCase {
  constructor({ userRepository }) {
    this._userRepository = userRepository;
  }

  async execute({ userId }) {
    if (!userId || typeof userId !== 'string') {
      throw new InvariantError('wajib menyertakan user id');
    }

    const user = await this._userRepository.getUserDetailById(userId);
    if (!user) {
      throw new NotFoundError('akun tidak ditemukan');
    }
    return new UserDetail(user);
  }
}

module.exports = GetUserDetailUseCase;