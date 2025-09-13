const InvariantError = require('./InvariantError');

const DomainErrorTranslator = {
  translate(error) {
    return DomainErrorTranslator._directories[error.message] || error;
  },
};

DomainErrorTranslator._directories = {
  'REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('tidak dapat membuat akun baru karena email atau password tidak ada'),
  'REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('tidak dapat membuat user baru karena tipe data tidak sesuai'),
  'REGISTER_USER.NOT_MEET_MINIMUM_PASSWORD': new InvariantError('password minimal 8 karakter'),
  'REGISTER_USER.INVALID_EMAIL_FORMAT': new InvariantError('format email tidak valid'),
  'USER_LOGIN.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('harus mengirimkan email dan password'),
  'USER_LOGIN.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('email dan password harus string'),
  'USER_LOGIN.INVALID_EMAIL_FORMAT': new InvariantError('format email tidak valid'),
  'USER_DETAIL.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('tidak dapat membuat detail user karena properti yang dibutuhkan tidak ada'),
  'USER_DETAIL.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('tidak dapat membuat detail user karena tipe data tidak sesuai'),
  'REFRESH_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN': new InvariantError('harus mengirimkan token refresh'),
  'REFRESH_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('refresh token harus string'),
  'DELETE_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN': new InvariantError('harus mengirimkan token refresh'),
  'DELETE_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('refresh token harus string'),
  'RESET_PASSWORD_REQUEST.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('tidak dapat melakukan permintaan reset password karena properti yang dibutuhkan tidak ada'),
  'RESET_PASSWORD_REQUEST.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('tidak dapat membuat permintaan reset password karena tipe data tidak sesuai'),
  'RESET_PASSWORD_REQUEST.INVALID_EMAIL_FORMAT': new InvariantError('format email tidak valid'),
  'RESET_PASSWORD_CONFIRM.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('tidak dapat membuat password baru karena properti yang dibutuhkan tidak ada'),
  'RESET_PASSWORD_CONFIRM.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('tidak dapat membuat password baru karena tipe data tidak sesuai'),
  'RESET_PASSWORD_CONFIRM.NOT_MEET_MINIMUM_PASSWORD': new InvariantError('password minimal 8 karakter'),
  'ADD_CONTENT.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('tidak dapat menambahkan konten karena properti yang dibutuhkan tidak ada'),
  'ADD_CONTENT.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('tidak dapat menambahkan konten karena tipe data tidak sesuai'),
  'ADD_CONTENT.INVALID_VARIATIONS': new InvariantError('variasi tidak valid'),
  'ADD_CONTENT.TOO_MANY_VARIATIONS': new InvariantError('terlalu banyak variasi'),
  'UPDATE_TRANSACTION.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('tidak dapat memperbarui transaksi baru karena tipe data tidak sesuai'),
  'UPDATE_TRANSACTION.AMOUNT_MUST_BE_POSITIVE': new InvariantError('amount harus berupa angka positif'),
};

module.exports = DomainErrorTranslator;
