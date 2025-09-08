const express = require('express');
const UsersHandler = require('./handler');
const asyncHandler = require('../../../../Commons/utils/asyncHandler');
const ensureAuth = require('../../middlewares/ensureAuth.js');
const ensureVerified = require('../../middlewares/ensureVerified.js');

const usersRouter = (container) => {
  const router =  express.Router();
  const handler = new UsersHandler(container);

  router.post('/', asyncHandler(handler.postUserHandler));
  router.post('/verify-otp', asyncHandler(handler.verifyUserOtpHandler));
  router.post('/resend-otp', asyncHandler(handler.resendUserOtpHandler));
  router.get('/profile/me', ensureAuth, ensureVerified(container), asyncHandler(handler.getUserDetailHandler));

  return router;
};

module.exports = usersRouter;
