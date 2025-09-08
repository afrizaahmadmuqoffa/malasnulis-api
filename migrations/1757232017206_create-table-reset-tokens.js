/* eslint-disable camelcase */
exports.up = (pgm) => {
  pgm.createTable('reset_tokens', {
    id: {
      type: 'VARCHAR(255)',
      primaryKey: true,
    },
    token: {
      type: 'TEXT',
      primaryKey: true,
    },
    user_email: {
      type: 'VARCHAR(50)',
      notNull: true,
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

  pgm.addConstraint('reset_tokens', 'fk_reset_tokens.user_email_users.email', 'FOREIGN KEY(user_email) REFERENCES users(email) ON DELETE CASCADE');

  pgm.createIndex('reset_tokens', 'user_email');
};

exports.down = (pgm) => {
  pgm.dropIndex('reset_tokens', 'user_email');
  pgm.dropTable('reset_tokens');
};
