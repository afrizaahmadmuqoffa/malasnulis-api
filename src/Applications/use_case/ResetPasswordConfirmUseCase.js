const ResetPasswordConfirm = require('../../Domains/reset_password/entities/ResetPasswordConfirm');

class ResetPasswordConfirmUseCase {
  constructor({ resetPasswordRepository, hasher, userRepository }) {
    this._resetPasswordRepository = resetPasswordRepository;
    this._hasher = hasher;
    this._userRepository = userRepository;
  }

  async execute(useCasePayload) {
    const { token, newPassword } = new ResetPasswordConfirm(useCasePayload);

    const resetToken = await this._resetPasswordRepository.getResetToken(token);

    const hashedPassword = await this._hasher.hash(newPassword);

    await this._userRepository.changePassword({ email: resetToken.user_email, hashedPassword });

    await this._resetPasswordRepository.deleteToken(resetToken.id);
  }
}

module.exports = ResetPasswordConfirmUseCase;
