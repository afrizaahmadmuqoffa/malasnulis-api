class UsersHandler {
  constructor(container) {
    this._addUserUseCase = container.addUserUseCase;
    this._getUserDetailUseCase = container.getUserDetailUseCase;
    this._verifyOtpUseCase = container.verifyOtpUseCase;
    this._resendOtpUseCase = container.resendOtpUseCase;

    // bind handler method
    this.postUserHandler = this.postUserHandler.bind(this);
    this.getUserDetailHandler = this.getUserDetailHandler.bind(this);
    this.verifyUserOtpHandler = this.verifyUserOtpHandler.bind(this);
    this.resendUserOtpHandler = this.resendUserOtpHandler.bind(this);
  }

  async postUserHandler(req, res) {
    const registeredUser = await this._addUserUseCase.execute(req.body);
    return res.status(201).json({
      status: 'success',
      data: {
        registeredUser,
      },
    });
  }

  async verifyUserOtpHandler(req, res) {
    const verifiedUser = await this._verifyOtpUseCase.execute(req.body);
    return res.status(200).json({
      status: 'success',
      data:{
        verifiedUser,
      }
    });
  }

  async resendUserOtpHandler(req, res) {
    await this._resendOtpUseCase.execute(req.body);
    return res.status(200).json({
      status: 'success',
      message: 'kode otp berhasil dikirim ulang'
    });
  }

  async getUserDetailHandler(req, res) {
    const userId = req.user.id;

    const user = await this._getUserDetailUseCase.execute({ userId });

    return res.status(200).json({
      status: 'success',
      data: {
        user,
      }
    });
  }
}

module.exports = UsersHandler;
