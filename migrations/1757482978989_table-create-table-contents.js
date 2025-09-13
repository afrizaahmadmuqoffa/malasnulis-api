/* eslint-disable camelcase */
exports.up = (pgm) => {

  pgm.createTable('contents', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true
    },
    user_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    platform: {
      type: 'VARCHAR(100)',
      notNull: true,
    },
    type: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    tone: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    language: {
      type: 'VARCHAR(10)',
      default: 'id'
    },
    input_prompt: {
      type: 'TEXT',
      notNull: true
    },
    generated_content: {
      type: 'JSONB',
      notNull: true,
      default: pgm.func('jsonb_build_array()'),
    },
    created_at: {
      type: 'TIMESTAMP',
      default: pgm.func('current_timestamp'),
      notNull: true,
    },
  });

  pgm.addConstraint('contents', 'fk_contents.user_id_users.id', 'FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE');

};

exports.down = (pgm) => {
  pgm.dropTable('contents');
};
