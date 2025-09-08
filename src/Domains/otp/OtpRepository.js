/* eslint-disable no-unused-vars */
class OtpRepository {
  async saveOtp(payload) {
    throw new Error('OTP_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getOtp(email) {
    throw new Error('OTP_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async incrementAttempt(id) {
    throw new Error('OTP_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getStatsOtp(email) {
    throw new Error('OTP_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async deleteOtp(id) {
    throw new Error('OTP_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = OtpRepository;
