import { lightBlue } from '@team-off/theme';

export const borderColor = lightBlue['100'];

export const bgColor = lightBlue['50'];

export const months = [
  {
    name: 'March',
    days: 6,
  },
  {
    name: 'April',
    days: 4,
  },
];

export const days = months.reduce((acc, month) => acc + month.days, 0);

export const searchBoxSpan = ['MONTHS_ROW', 'DAYS_ROW'].length;
