const AuthenticationError = require('../../../Commons/exceptions/AuthenticationError');

const ensureVerified = (container) => {
  return async (req, res, next) => {
    try {
      const userId = req.user.id;
      if (!userId) throw new AuthenticationError('anda belum login');

      const userFromDb = await container.getUserDetailUseCase.execute({ userId });
      if (!userFromDb.is_verified) {
        throw new AuthenticationError('akun anda belum terverifikasi');
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = ensureVerified;
