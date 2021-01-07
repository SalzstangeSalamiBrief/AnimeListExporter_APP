/**
 * Create a date-string (yyyy_mm_dd) based on the current date
 */
export default function calcDate(): string {
  const currentDate = (new Date()).toLocaleDateString('en-GB', { timeZone: 'UTC' });
  const formattedDate = currentDate.split('/').reverse().join('_');
  return formattedDate;
}
