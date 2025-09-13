const pool = require('./database/postgres/pool.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { nanoid } = require('nanoid');

const AuthenticationRepositoryPostgres = require('./repository/AuthenticationRepositoryPostgres');
const UserRepositoryPostgres = require('./repository/UserRepositoryPostgres');
const JwtTokenManager = require('./security/JwtTokenManager');
const BcryptHash = require('./security/BcryptHash.js');
const CryptoEncryption = require('./security/CryptoEncryption.js');
const ResetPasswordRepositoryPostgres = require('./repository/ResetPasswordRepositoryPostgres.js');

const AddUserUseCase = require('../Applications/use_case/AddUserUseCase');
const LoginUserUseCase = require('../Applications/use_case/LoginUserUseCase');
const LogoutUserUseCase = require('../Applications/use_case/LogoutUserUseCase');
const RefreshAuthenticationUseCase = require('../Applications/use_case/RefreshAuthenticationUseCase');
const ResetPasswordConfirmUseCase = require('../Applications/use_case/ResetPasswordConfirmUseCase.js');
const ResetPasswordRequestUseCase = require('../Applications/use_case/ResetPasswordRequestUseCase.js');
const GetUserDetailUseCase = require('../Applications/use_case/GetUserDetailUseCase.js');
const VerifyOtpUseCase = require('../Applications/use_case/VerifyOtpUseCase.js');
const ResendOtpUseCase = require('../Applications/use_case/ResendOtpUseCase.js');
const OtpRepositoryPostgres = require('./repository/OtpRepositoryPostgres.js');
const BrevoEmailSender = require('./mailSender/BrevoMailSender.js');
const VerifyResetPasswordUseCase = require('../Applications/use_case/VerifyResetPasswordUseCase.js');
const GenerateContentUseCase = require('../Applications/use_case/GenerateContentUseCase.js');
const FakeBedrock = require('./aiService/FakeBedrock.js');
const ContentRepositoryPostgres = require('./repository/ContentRepositoryPostgres.js');
const GetContentDetailUseCase = require('../Applications/use_case/GetContentDetailUseCase.js');


const container = {};

// instantiate repositories & utilities
const userRepository = new UserRepositoryPostgres(pool, nanoid);
const authRepository = new AuthenticationRepositoryPostgres(pool);
const otpRepository = new OtpRepositoryPostgres(pool, nanoid);
const resetPasswordRepository = new ResetPasswordRepositoryPostgres(pool, nanoid);
const contentRepository = new ContentRepositoryPostgres(pool, nanoid);
const hasher = new BcryptHash(bcrypt);
const tokenManager = new JwtTokenManager(jwt);
const tokenGenerator = new CryptoEncryption(crypto);
const mailSender = new BrevoEmailSender();
const aiService = new FakeBedrock();


// register use cases
container.addUserUseCase = new AddUserUseCase({
  userRepository,
  hasher,
  otpRepository,
  tokenGenerator,
  mailSender,
});

container.loginUserUseCase = new LoginUserUseCase({
  userRepository,
  authenticationRepository: authRepository,
  authenticationTokenManager: tokenManager,
  hasher,
});

container.logoutUserUseCase = new LogoutUserUseCase({
  authenticationRepository: authRepository,
});

container.refreshAuthenticationUseCase = new RefreshAuthenticationUseCase({
  authenticationRepository: authRepository,
  authenticationTokenManager: tokenManager,
});

container.resetPasswordRequestUseCase = new ResetPasswordRequestUseCase({
  userRepository,
  resetPasswordRepository,
  tokenGenerator,
  mailSender
});

container.verifyResetPasswordUseCase = new VerifyResetPasswordUseCase({
  resetPasswordRepository,
});

container.resetPasswordConfirmUseCase = new ResetPasswordConfirmUseCase({
  resetPasswordRepository,
  hasher,
  userRepository,
});

container.getUserDetailUseCase = new GetUserDetailUseCase({
  userRepository,
});

container.verifyOtpUseCase = new VerifyOtpUseCase({
  userRepository,
  otpRepository,
  hasher,
});

container.resendOtpUseCase = new ResendOtpUseCase({
  userRepository,
  hasher,
  otpRepository,
  tokenGenerator,
  mailSender,
});

container.generateContentUseCase = new GenerateContentUseCase({
  aiService,
  contentRepository,
});

container.getContentDetailUseCase = new GetContentDetailUseCase({
  contentRepository
});

module.exports = container;
