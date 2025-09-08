const ResetPasswordRequest = require('../../Domains/reset_password/entities/ResetPasswordRequest');

class ResetPasswordRequestUseCase {
  constructor({ userRepository, resetPasswordRepository, tokenGenerator, mailSender }) {
    this._userRepository = userRepository;
    this._resetPasswordRepository = resetPasswordRepository;
    this._tokenGenerator = tokenGenerator;
    this._mailSender = mailSender;
  }

  async execute(useCasePayload) {
    const { email } = new ResetPasswordRequest(useCasePayload);

    const isExist = await this._userRepository.isUserExist({ email });

    if (!isExist) {
      return;
    }

    const token = await this._tokenGenerator.generateToken(32);

    const expiresAt = new Date(Date.now() + 1000 * 60 * 15); // 15 menit

    await this._resetPasswordRepository.saveResetToken({ email, token, expiresAt });
    const resetLink = `${process.env.APP_URL}/api/reset-password/validate?token=${token}`;

    await this._mailSender.send(
      email,
      'Reset Password Akun Anda',
      `Klik link berikut untuk reset password Anda: ${resetLink}`,
      `<div style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">
    <div style="max-width: 500px; margin: auto; background: #ffffff; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.1); padding: 20px;">
      <h2 style="color: #333; text-align: center;">Reset Password</h2>
      <p style="color: #555;">Halo <b>${email}</b>,</p>
      <p style="color: #555;">Kami menerima permintaan untuk mereset password akun Anda. Klik tombol di bawah ini untuk melanjutkan:</p>
      
      <div style="text-align: center; margin: 25px 0;">
        <a href="${resetLink}" target="_blank"
           style="display: inline-block; background: #666; color: #fff; font-size: 16px; font-weight: bold; padding: 12px 24px; border-radius: 6px; text-decoration: none;">
          Reset Password
        </a>
      </div>
      
      <p style="color: #777; font-size: 14px;">Jika tombol di atas tidak berfungsi, Anda bisa gunakan link berikut:</p>
      <p style="color: #555; word-break: break-all;">
        <a href="${resetLink}" target="_blank" style="color: #333;">${resetLink}</a>
      </p>
      
      <p style="color: #777; font-size: 14px; text-align: center; margin-top: 20px;">
        Jika Anda tidak meminta reset password, abaikan email ini.
      </p>
    </div>
    <p style="text-align: center; color: #aaa; font-size: 12px; margin-top: 10px;">
      &copy; ${new Date().getFullYear()} MalasNulis. Semua Hak Dilindungi.
    </p>
  </div>
  `
    );
  }
}


module.exports = ResetPasswordRequestUseCase;