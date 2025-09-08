const InvariantError = require('../../Commons/exceptions/InvariantError');
const TooManyRequestError = require('../../Commons/exceptions/TooManyRequestError');
const OtpPayload = require('../../Domains/otp/entities/OtpPayload');

class ResendOtpUseCase {
  constructor({
    userRepository,
    hasher,
    otpRepository,
    tokenGenerator,
    mailSender
  }) {
    this._userRepository = userRepository;
    this._hasher = hasher;
    this._otpRepository = otpRepository;
    this._tokenGenerator = tokenGenerator;
    this._mailSender = mailSender;
  }

  async execute({ email }) {
    console.log(email);
    if (!email) throw new InvariantError('wajib menyertakan email');
    const userId = await this._userRepository.getIdByEmail(email);
    const user = await this._userRepository.getUserDetailById(userId);
    if (user.is_verified) throw new InvariantError('akun anda telah terverifikasi');

    const stats = await this._otpRepository.getOtpStats(user.email);

    if (Number(stats.last_minute) > 0) {
      throw new TooManyRequestError('sudah mencapai batas kirim otp, harap tunggu 1 menit!');
    }
    if (Number(stats.last_hour) >= 5) {
      throw new TooManyRequestError('sudah mencapai batas kirim otp, harap tunggu 5 menit!');
    }
    if (Number(stats.last_day) >= 10) {
      throw new TooManyRequestError('sudah mencapai batas kirim otp, harap tunggu 10 menit!');
    }

    const code = await this._tokenGenerator.generateOtp(6);
    const hashCode = await this._hasher.hash(code);
    const otpPayload = new OtpPayload({
      email: user.email,
      code: hashCode,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 min
    });

    await this._otpRepository.saveOtp(otpPayload);

    await this._mailSender.send(
      user.email,
      'Verifikasi Akun Anda',
      `Kode OTP Anda adalah ${code}`,
      `<div style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">
        <div style="max-width: 500px; margin: auto; background: #ffffff; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.1); padding: 20px;">
        <h2 style="color: #333; text-align: center;">Verifikasi Akun Anda</h2>
        <p style="color: #555;">Halo <b>${user.email}</b>,</p>
        <p style="color: #555;">Gunakan kode OTP berikut untuk memverifikasi akun Anda. Kode hanya berlaku selama <b>5 menit</b>:</p>
        
        <div style="text-align: center; margin: 20px 0;">
          <span style="display: inline-block; background: #e0e0e0; color: #333; font-size: 24px; font-weight: bold; padding: 12px 20px; border-radius: 6px; letter-spacing: 2px;">
            ${code}
          </span>
        </div>
      
        <p style="color: #777; font-size: 14px; text-align: center;">Jika Anda tidak meminta kode, abaikan email ini.</p>
      </div>
     <p style="text-align: center; color: #aaa; font-size: 12px; margin-top: 10px;">
      &copy; ${new Date().getFullYear()} MalasNulis. Semua Hak Dilindungi.
    </p>
  </div>
  `
    );
  }
}

module.exports = ResendOtpUseCase;
