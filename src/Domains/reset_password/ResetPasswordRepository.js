/* eslint-disable no-unused-vars */
class ResetPasswordRepository {
  async saveResetToken(payload){
    throw new Error('RESET_PASSWORD_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getResetToken(token) {
    throw new Error('RESET_PASSWORD_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async deleteToken(id) {
    throw new Error('RESET_PASSWORD_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = ResetPasswordRepository;
