const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

export type Month = (typeof MONTHS)[number];

export const MONTH_YEAR_REGEX =
  /^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{4}$/;

export function isValidMonthYear(value: string): boolean {
  return MONTH_YEAR_REGEX.test(value);
}

export function monthYearToNumber(value: string): number {
  const [month, year] = value.split(" ");

  const monthIndex = MONTHS.indexOf(month as Month);

  return Number(year) * 12 + monthIndex;
}

export function isMonthYearAfter(startDate: string, endDate: string): boolean {
  return monthYearToNumber(startDate) < monthYearToNumber(endDate);
}
