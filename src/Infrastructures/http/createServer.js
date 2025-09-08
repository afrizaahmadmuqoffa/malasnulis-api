/* eslint-disable no-unused-vars */
const express = require('express');
const usersRouter = require('../../Interfaces/http/api/users/router.js');
const authRouter = require('../../Interfaces/http/api/authentications/router.js');
const resetPasswordRouter = require('../../Interfaces/http/api/reset_password/router.js');
const NotFoundError = require('../../Commons/exceptions/NotFoundError.js');
const DomainErrorTranslator = require('../../Commons/exceptions/DomainErrorTranslator.js');
const ClientError = require('../../Commons/exceptions/ClientError.js');

const createServer = (container) => {
  const app = express();
  app.use(express.json());

  // Register routes
  app.use('/api/users', usersRouter(container));
  app.use('/api/authentications', authRouter(container));
  app.use('/api/reset-password', resetPasswordRouter(container));

  app.use((req, res, next) => {
    throw new NotFoundError('route tidak ditemukan');
  });


  // Centralized Error Handler
  app.use((err, req, res, next) => {
    // Translate domain error ke bentuk readable
    const translatedError = DomainErrorTranslator.translate(err);

    if (translatedError instanceof ClientError) {
      res.status(translatedError.statusCode).json({
        status: 'fail',
        message: translatedError.message,
      });
    } else {
      res.status(500).json({
        status: 'error',
        message: 'terjadi kesalahan pada server kami',
      });
    }
  });

  return app;
};

module.exports = createServer;
