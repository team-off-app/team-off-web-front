import { range } from 'lodash';
import { Fragment } from 'react';
import { CalendarMonths } from './components/data/CalendarMonths';
import { SearchUsers } from './components/data/SearchUsers';
import { CalendarDays } from './components/data/CalendarDays';
import { UserData } from './components/data/UserData';
import { UserEvents } from './components/data/UserEvents';
import { CalendarGrid } from './components/view/CalendarGrid';

/* eslint-disable-next-line */
export interface CalendarProps {}

export function Calendar(props: CalendarProps) {
  return (
    <CalendarGrid>
      <SearchUsers />
      <CalendarMonths />
      <CalendarDays />

      {range(5).map((_, index) => (
        <Fragment key={index}>
          <UserData />
          <UserEvents />
        </Fragment>
      ))}
    </CalendarGrid>
  );
}

export default Calendar;
