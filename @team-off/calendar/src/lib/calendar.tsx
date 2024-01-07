import { useSignalEffect } from '@preact/signals-react';
import { client } from '@team-off/api';
import { Fragment } from 'react';
import { useAsync } from 'react-async-hook';
import { CalendarDays } from './components/data/CalendarDays';
import { CalendarMonths } from './components/data/CalendarMonths';
import { SearchUsers } from './components/data/SearchUsers';
import { UserData } from './components/data/UserData';
import { UserEvents } from './components/data/UserEvents';
import { CalendarGrid } from './components/view/CalendarGrid';
import { User } from './types';
import { calendarDateRange } from './signals/calendar';
import { usersRequestSignal } from './signals/users';

/* eslint-disable-next-line */
export interface CalendarProps {}

export function Calendar(props: CalendarProps) {
  const usersRequest = useAsync(async () => {
    const dateRange = calendarDateRange.value;
    const startDate = dateRange[0];
    const endDate = dateRange[dateRange.length - 1];

    return await client.get<User[]>('/users/events', {
      params: {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      },
    });
  }, []);

  useSignalEffect(() => {
    usersRequestSignal.value = usersRequest;
  });

  return (
    <CalendarGrid>
      <SearchUsers />
      <CalendarMonths />
      <CalendarDays />
      {usersRequest.result?.data.map((user, index) => (
        <Fragment key={index}>
          <UserData user={user} />
          <UserEvents user={user} />
        </Fragment>
      ))}
    </CalendarGrid>
  );
}
