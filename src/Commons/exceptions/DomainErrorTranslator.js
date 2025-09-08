const InvariantError = require('./InvariantError');

const DomainErrorTranslator = {
  translate(error) {
    return DomainErrorTranslator._directories[error.message] || error;
  },
};

DomainErrorTranslator._directories = {
  'REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('tidak dapat membuat akun baru karena email atau password tidak ada'),
  'REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('tidak dapat membuat user baru karena tipe data tidak sesuai'),
  'REGISTER_USER.USERNAME_LIMIT_CHAR': new InvariantError('tidak dapat membuat user baru karena karakter username melebihi batas limit'),
  'REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER': new InvariantError('tidak dapat membuat user baru karena username mengandung karakter terlarang'),
  'REGISTER_USER.NOT_MEET_MINIMUM_PASSWORD': new InvariantError('password minimal 8 karakter'),
  'REGISTER_USER.INVALID_EMAIL_FORMAT': new InvariantError('format email tidak valid'),
  'UPDATE_USERNAME.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('tidak dapat update user karena properti yang dibutuhkan tidak ada'),
  'UPDATE_USERNAME.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('tidak dapat update user karena tipe data tidak sesuai'),
  'UPDATE_USERNAME.USERNAME_LIMIT_CHAR': new InvariantError('tidak dapat update user karena karakter username melebihi batas limit'),
  'UPDATE_USERNAME.USERNAME_CONTAIN_RESTRICTED_CHARACTER': new InvariantError('tidak dapat update user karena username mengandung karakter terlarang'),
  'UPDATE_PHOTO_USER.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('tidak dapat update foto baru karena properti yang dibutuhkan tidak ada'),
  'UPDATE_PHOTO_USER.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('tidak dapat update foto baru karena tipe data tidak sesuai'),
  'USER_LOGIN.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('harus mengirimkan email dan password'),
  'USER_LOGIN.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('email dan password harus string'),
  'USER_LOGIN.INVALID_EMAIL_FORMAT': new InvariantError('format email tidak valid'),
  'USER_DETAIL.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('tidak dapat membuat detail user karena properti yang dibutuhkan tidak ada'),
  'USER_DETAIL.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('tidak dapat membuat detail user karena tipe data tidak sesuai'),
  'REFRESH_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN': new InvariantError('harus mengirimkan token refresh'),
  'REFRESH_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('refresh token harus string'),
  'DELETE_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN': new InvariantError('harus mengirimkan token refresh'),
  'DELETE_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('refresh token harus string'),
  'RESET_PASSWORD_REQUEST.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('tidak dapat membuat permintaan reset password karena properti yang dibutuhkan tidak ada'),
  'RESET_PASSWORD_REQUEST.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('tidak dapat membuat permintaan reset password karena tipe data tidak sesuai'),
  'RESET_PASSWORD_REQUEST.INVALID_EMAIL_FORMAT': new InvariantError('format email tidak valid'),
  'RESET_PASSWORD_CONFIRM.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('tidak dapat membuat password baru karena properti yang dibutuhkan tidak ada'),
  'RESET_PASSWORD_CONFIRM.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('tidak dapat membuat password baru karena tipe data tidak sesuai'),
  'RESET_PASSWORD_CONFIRM.NOT_MEET_MINIMUM_PASSWORD': new InvariantError('password minimal 8 karakter'),
  'ADD_TRANSACTION.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('tidak dapat membuat transaksi baru karena properti yang dibutuhkan tidak ada'),
  'ADD_TRANSACTION.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('tidak dapat membuat transaksi baru karena tipe data tidak sesuai'),
  'ADD_TRANSACTION.AMOUNT_MUST_BE_POSITIVE': new InvariantError('amount harus berupa angka positif'),
  'UPDATE_TRANSACTION.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('tidak dapat memperbarui transaksi baru karena properti yang dibutuhkan tidak ada'),
  'UPDATE_TRANSACTION.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('tidak dapat memperbarui transaksi baru karena tipe data tidak sesuai'),
  'UPDATE_TRANSACTION.AMOUNT_MUST_BE_POSITIVE': new InvariantError('amount harus berupa angka positif'),
};

module.exports = DomainErrorTranslator;
