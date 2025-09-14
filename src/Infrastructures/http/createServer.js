/* eslint-disable no-unused-vars */
require('../logger/sentryInstrument.js');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimiter = require('express-rate-limit');
const Sentry = require('@sentry/node');
const logger = require('../logger/winstonLogger.js');
const usersRouter = require('../../Interfaces/http/api/users/router.js');
const authRouter = require('../../Interfaces/http/api/authentications/router.js');
const resetPasswordRouter = require('../../Interfaces/http/api/reset_password/router.js');
const contentsRouter = require('../../Interfaces/http/api/contents/router.js');
const NotFoundError = require('../../Commons/exceptions/NotFoundError.js');
const DomainErrorTranslator = require('../../Commons/exceptions/DomainErrorTranslator.js');
const ClientError = require('../../Commons/exceptions/ClientError.js');
const swaggerDocs = require('../../Interfaces/http/docs/swagger.js');

const createServer = (container) => {
  const app = express();
  app.use(express.json());

  // Security headers
  app.use(helmet());

  app.use(cors());

  // Global rate limiter
  app.use(rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 menit
    max: 100,
    message: { error: 'terlalu sering mencoba, coba lagi nanti.' }
  }));

  const sensitiveLimiter = rateLimiter({
    windowMs: 60 * 1000,
    max: 5,
    message: { status: 'fail', message: 'terlalu sering mencoba, coba lagi nanti.' },
  });

  // log request
  app.use((req, res, next) => {
    logger.info(`[${req.method}] ${req.originalUrl} - IP: ${req.ip}`);
    next();
  });

  //sentry init
  Sentry.init({
    dsn: process.env.DSN,
    sendDefaultPii: true,
    tracesSampleRate: 1.0,
  });

  app.get('/', (req, res) => {
    res.send('Hello world!');
  });

  app.get('/debug-sentry', () => {
    throw new Error('error test');
  });

  // Register routes
  app.use('/api/users', sensitiveLimiter, usersRouter(container));
  app.use('/api/authentications', sensitiveLimiter, authRouter(container));
  app.use('/api/reset-password', sensitiveLimiter, resetPasswordRouter(container));
  app.use('/api/contents', contentsRouter(container));

  Sentry.setupExpressErrorHandler(app);

  swaggerDocs(app);

  app.use((req, res, next) => {
    throw new NotFoundError('route tidak ditemukan');
  });

  app.use((err, req, res, next) => {
    res.statusCode = 500;
    res.end(`${res.sentry  }\n`); // `res.sentry` = ID error di GlitchTip
  });


  // Centralized Error Handler
  app.use((err, req, res, next) => {
    // Translate domain error ke bentuk readable
    const translatedError = DomainErrorTranslator.translate(err);

    if (translatedError instanceof ClientError) {
      logger.warn(`Client error: ${translatedError.message}`);
      res.status(translatedError.statusCode).json({
        status: 'fail',
        message: translatedError.message,
      });
    } else {
      logger.error(`Server error: ${err.message}`, { stack: err.stack });
      res.status(500).json({
        status: 'error',
        message: 'terjadi kesalahan pada server kami',
        sentryId: res.sentry,
      });
    }
  });

  return app;
};

module.exports = createServer;
