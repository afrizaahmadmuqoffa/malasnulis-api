/* eslint-disable camelcase */
exports.up = (pgm) => {
  pgm.createTable('otps', {
    id: {
      type: 'VARCHAR(100)',
      primaryKey: true
    },
    code: {
      type: 'TEXT',
      primaryKey: true,
    },
    user_email: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    attempt: {
      type: 'INT',
      default: 0
    },
    created_at: {
      type: 'TIMESTAMP',
      default: pgm.func('current_timestamp'),
      notNull: true,
    },
    expires_at: {
      type: 'TIMESTAMP',
      notNull: true,
    },
  });

  pgm.addConstraint('otps', 'fk_otps.user_email_users.email', 'FOREIGN KEY(user_email) REFERENCES users(email) ON DELETE CASCADE');

  pgm.createIndex('otps', 'user_email');
};

exports.down = (pgm) => {
  pgm.dropIndex('otps', 'user_email');
  pgm.dropTable('otps');
};
