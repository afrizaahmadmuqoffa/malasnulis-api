const AuthenticationError = require('../../Commons/exceptions/AuthenticationError');
const InvariantError = require('../../Commons/exceptions/InvariantError');
const NotFoundError = require('../../Commons/exceptions/NotFoundError');

class VerifyResetPasswordUseCase {
  constructor({ resetPasswordRepository }) {
    this._resetPasswordRepository = resetPasswordRepository;
  }

  async execute({ token }) {
    if (!token || typeof token !== 'string') {
      throw new InvariantError('token tidak disertakan atau tidak valid');
    }

    const resetToken = await this._resetPasswordRepository.getResetToken(token);
    if (!resetToken) throw new NotFoundError('reset token tidak ada');

    const now = new Date();
    const expiresAt = new Date(resetToken.expires_at);
    if (now > expiresAt) {
      throw new AuthenticationError('reset token telah kedaluwarsa');
    }

    return resetToken.user_email;
  }
}

module.exports = VerifyResetPasswordUseCase;
