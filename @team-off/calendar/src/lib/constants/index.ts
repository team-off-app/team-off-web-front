import { lightBlue } from '@team-off/theme';

export const borderColor = lightBlue['100'];

export const bgColor = lightBlue['50'];

export const months = [
  {
    name: 'Janeiro',
    days: 2,
  },
  {
    name: 'Fevereiro',
    days: 2,
  },
  {
    name: 'Março',
    days: 4,
  },
];

export const days = months.reduce((acc, month) => acc + month.days, 0);

export const searchBoxSpan = ['MONTHS', 'DAYS'].length;
