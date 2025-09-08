function formatDateWithOffset(date, offsetHours = 7) {
  if (!date) return null;

  const originalDate = new Date(date);
  if (isNaN(originalDate.getTime())) return null;

  const offsetMs = offsetHours * 60 * 60 * 1000;
  const adjustedDate = new Date(originalDate.getTime() + offsetMs);

  return adjustedDate.toISOString().split('T')[0]; // "YYYY-MM-DD"
}

module.exports = formatDateWithOffset;