class AuthHandler {
  constructor(container) {
    this._loginUserUseCase = container.loginUserUseCase;
    this._refreshAuthenticationUseCase = container.refreshAuthenticationUseCase;
    this._logoutUserUseCase = container.logoutUserUseCase;

    this.loginHandler = this.loginHandler.bind(this);
    this.refreshHandler = this.refreshHandler.bind(this);
    this.logoutHandler = this.logoutHandler.bind(this);
  }

  async loginHandler(req, res) {
    const auth = await this._loginUserUseCase.execute(req.body);
    return res.status(201).json({
      status: 'success',
      data: {
        accessToken: auth.accessToken,
        refreshToken: auth.refreshToken,
      },
    });
  }

  async refreshHandler(req, res) {
    const newAccessToken = await this._refreshAuthenticationUseCase.execute(req.body);
    return res.status(200).json({
      status: 'success',
      data: {
        accessToken: newAccessToken,
      },
    });
  }

  async logoutHandler(req, res) {
    await this._logoutUserUseCase.execute(req.body);
    return res.status(200).json({
      status: 'success',
    });
  }
}

module.exports = AuthHandler;
