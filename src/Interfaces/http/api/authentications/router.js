const express = require('express');
const AuthHandler = require('./handler');
const asyncHandler = require('../../../../Commons/utils/asyncHandler.js');


const authRouter = (container) => {
  const router = express.Router();
  const handler = new AuthHandler(container);

  router.post('/', asyncHandler(handler.loginHandler));
  router.put('/', asyncHandler(handler.refreshHandler));
  router.delete('/', asyncHandler(handler.logoutHandler));

  return router;
};

module.exports = authRouter;

