const Sentry = require('@sentry/node');

Sentry.init({
  dsn: process.env.DSN,
  sendDefaultPii: true,
  tracesSampleRate: 1.0,
});

module.exports = Sentry;