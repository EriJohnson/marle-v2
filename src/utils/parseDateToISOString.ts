function parseDateToISOString(date: string): string {
  if (!date) return '';

  const [day, month, year] = date.split('/');

  return `${year}-${month}-${day}`;
}

export default parseDateToISOString;
