const UserLogin = require('../../Domains/users/entities/UserLogin');
const NewAuthentication = require('../../Domains/authentications/entities/NewAuth');
const InvariantError = require('../../Commons/exceptions/InvariantError');
const AuthenticationError = require('../../Commons/exceptions/AuthenticationError');

class LoginUserUseCase {
  constructor({
    userRepository,
    authenticationRepository,
    authenticationTokenManager,
    hasher,
  }) {
    this._userRepository = userRepository;
    this._authenticationRepository = authenticationRepository;
    this._authenticationTokenManager = authenticationTokenManager;
    this._hasher = hasher;
  }

  async execute(useCasePayload) {
    const { email, password } = new UserLogin(useCasePayload);
    console.log('usecase: ', password);

    const userId = await this._userRepository.getIdByEmail(email);
    const user = await this._userRepository.getUserDetailById(userId);
    if (user.is_verified === false) throw new InvariantError('akun anda belum diverifikasi');

    const encryptedPassword = await this._userRepository.getPasswordByEmail(email);

    const resultCompare = await this._hasher.compare(password, encryptedPassword);
    if (!resultCompare) {
      throw new AuthenticationError('kredensial yang anda masukkan salah');
    }

    const accessToken = await this._authenticationTokenManager
      .createAccessToken({ email, id: userId });
    const refreshToken = await this._authenticationTokenManager
      .createRefreshToken({ email, id: userId });

    const newAuthentication = new NewAuthentication({
      accessToken,
      refreshToken,
    });

    await this._authenticationRepository.addToken(newAuthentication.refreshToken);

    return newAuthentication;
  }
}

module.exports = LoginUserUseCase;
