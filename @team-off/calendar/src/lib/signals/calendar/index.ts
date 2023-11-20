import { computed } from '@preact/signals-react';
import dayjs from 'dayjs';

export const calendarDateRange = computed(() => {
  const referenceDate = dayjs('2023-11-01');
  const startReferenceDate = referenceDate.subtract(4, 'day');
  const endReferenceDate = referenceDate.add(6, 'day');
  const range = [];

  let date = startReferenceDate;
  while (date.isBefore(endReferenceDate)) {
    range.push(date);
    date = date.add(1, 'day');
  }
  return range;
});

export const monthsInCalendarDateRange = computed(() => {
  const months = calendarDateRange.value.reduce((months, date) => {
    const monthName = date.format('MMMM');
    if (!months.has(monthName)) {
      months.set(monthName, { name: monthName, span: 1 });
    } else {
      const month = months.get(monthName);
      if (month) month.span += 1;
    }
    return months;
  }, new Map<string, { name: string; span: number }>());
  return Array.from(months.values());
});
