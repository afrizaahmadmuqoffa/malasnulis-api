const OtpPayload = require('../../Domains/otp/entities/OtpPayload');
const RegisteredUser = require('../../Domains/users/entities/RegisteredUser');
const RegisterUser = require('../../Domains/users/entities/RegisterUser');

class AddUserUseCase {
  constructor({ userRepository, hasher, otpRepository, tokenGenerator, mailSender }) {
    this._userRepository = userRepository;
    this._hasher = hasher;
    this._otpRepository = otpRepository;
    this._tokenGenerator = tokenGenerator;
    this._mailSender = mailSender;
  }

  async execute(useCasePayload) {
    const registerUser = new RegisterUser(useCasePayload);
    await this._userRepository.verifyAvailableEmail(registerUser.email);
    registerUser.password = await this._hasher.hash(registerUser.password);
    const user = await this._userRepository.addUser(registerUser);

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
      'Verifikasi Akun MalasNulis Anda',
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

    return new RegisteredUser({ ...user });
  }
}

module.exports = AddUserUseCase;
