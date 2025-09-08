class ResetPasswordHandler {
  constructor(container) {
    this._resetPasswordRequestUseCase = container.resetPasswordRequestUseCase;
    this._resetPasswordConfirmUseCase = container.resetPasswordConfirmUseCase;
    this._verifyResetPasswordUseCase = container.verifyResetPasswordUseCase;

    // bind handler method
    this.resetPasswordRequestHandler = this.resetPasswordRequestHandler.bind(this);
    this.verifyResetTokenHandler = this.verifyResetTokenHandler.bind(this);
    this.resetPasswordConfirmHandler = this.resetPasswordConfirmHandler.bind(this);
  }

  async resetPasswordRequestHandler(req, res) {
    await this._resetPasswordRequestUseCase.execute(req.body);
    return res.status(200).json({
      status: 'success',
      message: 'jika email terdaftar di database, tautan akan terkirim',
    });
  }

  async verifyResetTokenHandler(req, res) {
    const { token } = req.query;
    const email = await this._verifyResetPasswordUseCase.execute({ token });

    return res.status(200).json({
      status: 'success',
      message: 'reset token valid, silahkan perbarui password',
      data: {
        email
      }
    });
  }

  async resetPasswordConfirmHandler(req, res) {
    await this._resetPasswordConfirmUseCase.execute(req.body);
    return res.status(200).json({
      status: 'success',
      message: 'berhasil memperbarui password',
    });
  }
}

module.exports = ResetPasswordHandler;
