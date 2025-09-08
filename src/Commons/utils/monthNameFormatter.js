function getMonthName(monthNumber) {
  const month = parseInt(monthNumber, 10);

  if (isNaN(month) || month < 1 || month > 12) {
    throw new Error('Invalid month number (must be 1-12)');
  }

  const monthNames = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  return monthNames[month - 1];
}

module.exports = {
  getMonthName,
};
