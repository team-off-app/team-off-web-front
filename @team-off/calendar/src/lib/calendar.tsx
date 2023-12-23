import { useSignalEffect } from '@preact/signals-react';
import { client } from '@team-off/api';
import { env } from '@team-off/env';
import { Fragment } from 'react';
import { CalendarDays } from './components/data/CalendarDays';
import { CalendarMonths } from './components/data/CalendarMonths';
import { SearchUsers } from './components/data/SearchUsers';
import { UserData } from './components/data/UserData';
import { UserEvents } from './components/data/UserEvents';
import { CalendarGrid } from './components/view/CalendarGrid';
import { users } from './services/users/signals';
import { User } from './services/users/types';

/* eslint-disable-next-line */
export interface CalendarProps {}

export function Calendar(props: CalendarProps) {
  useSignalEffect(() => {
    client.get<User[]>('/users').then((response) => {
      users.value = response.data;
    });
  });

  return (
    <CalendarGrid>
      <SearchUsers />
      <CalendarMonths />
      <CalendarDays />
      {users.value?.map((user, index) => (
        <Fragment key={index}>
          <UserData user={user} />
          <UserEvents user={user} />
        </Fragment>
      ))}
    </CalendarGrid>
  );
}

export default Calendar;
