const express = require('express');
const ResetPasswordHandler = require('./handler.js');
const asyncHandler = require('../../../../Commons/utils/asyncHandler');

const resetPasswordRouter = (container) => {
  const router =  express.Router();
  const handler = new ResetPasswordHandler(container);

  router.get('/validate', asyncHandler(handler.verifyResetTokenHandler));
  router.post('/request', asyncHandler(handler.resetPasswordRequestHandler));
  router.post('/confirm', asyncHandler(handler.resetPasswordConfirmHandler));

  return router;
};

module.exports = resetPasswordRouter;
