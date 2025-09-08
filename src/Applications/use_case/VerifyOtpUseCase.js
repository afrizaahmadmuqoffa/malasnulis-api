const AuthenticationError = require('../../Commons/exceptions/AuthenticationError');
const InvariantError = require('../../Commons/exceptions/InvariantError');
const TooManyRequestError = require('../../Commons/exceptions/TooManyRequestError');
const RegisteredUser = require('../../Domains/users/entities/RegisteredUser');

class VerifyOtpUseCase {
  constructor({ userRepository, otpRepository, hasher }) {
    this._userRepository = userRepository;
    this._otpRepository = otpRepository;
    this._hasher = hasher;
  }

  async execute({ email, code }) {
    if (!email || !code) throw new InvariantError('wajib menyertakan email dan kode otp');
    const userId = await this._userRepository.getIdByEmail(email);
    const user = await this._userRepository.getUserDetailById(userId);
    if (user.is_verified === true) throw new InvariantError('akun anda telah terverifikasi');

    const otpUser = await this._otpRepository.getOtp(email);
    if (!otpUser) throw new InvariantError('kode otp tidak ditemukan');
    if (otpUser.attempt >= 5) throw new TooManyRequestError('anda telah mencapai batas maksimal percobaan');

    const now = new Date();
    if (now > new Date(otpUser.expires_at)) {
      throw new InvariantError('kode otp sudah kedaluwarsa');
    }

    const resultCompare = await this._hasher.compare(code, otpUser.code);
    await this._otpRepository.incrementAttempt(otpUser.id);
    if (!resultCompare) {
      throw new AuthenticationError('otp yang anda masukkan salah');
    }

    const verifiedUser = await this._userRepository.verifyUser(email);
    await this._otpRepository.deleteOtp(otpUser.id);

    return new RegisteredUser(verifiedUser);
  }
}

module.exports = VerifyOtpUseCase;
