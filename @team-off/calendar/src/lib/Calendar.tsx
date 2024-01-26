import { Box, CircularProgress, Typography } from '@mui/material';
import { useSignalEffect } from '@preact/signals-react';
import { client, User, usersRequestSignal } from '@team-off/api';
import { ALL_USERS_TAB, tab, TeamsTabs } from '@team-off/teams-tabs';
import { Fragment } from 'react';
import { useAsync } from 'react-async-hook';

import { CalendarDays } from './components/data/CalendarDays';
import { CalendarMonths } from './components/data/CalendarMonths';
import { SearchUsers } from './components/data/SearchUsers';
import { UserData } from './components/data/UserData';
import { UserEvents } from './components/data/UserEvents';
import { CalendarGrid } from './components/view/CalendarGrid';
import { calendarDateRange } from './signals/calendar';

/* eslint-disable-next-line */
export interface CalendarProps {}

export function Calendar(props: CalendarProps) {
  const usersRequest = useAsync(async () => {
    const dateRange = calendarDateRange.value;
    const startDate = dateRange[0];
    const endDate = dateRange[dateRange.length - 1];

    const url = getUrl();
    if (!url) return;

    return await client.get<User[]>(url, {
      params: {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      },
    });

    function getUrl() {
      if (tab.value.index === ALL_USERS_TAB) return '/users/events';
      if (tab.value.team?.id) return `/team/${tab.value.team.id}/users`;
    }
  }, [tab.value.index]);

  useSignalEffect(() => {
    usersRequestSignal.value = usersRequest;
  });

  const isEmpty = usersRequest.result && usersRequest.result.data.length === 0;

  return (
    <Box>
      <TeamsTabs />

      <Box display="flex" mt={4}>
        {usersRequest.loading && <CircularProgress sx={{ margin: 'auto' }} />}

        {usersRequest.status === 'success' && isEmpty && (
          <Typography margin="auto">No users found</Typography>
        )}
      </Box>

      {usersRequest.status === 'success' && !isEmpty && (
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
      )}
    </Box>
  );
}
