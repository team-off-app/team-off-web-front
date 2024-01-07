import {
  Box,
  ListItemIcon,
  Menu,
  MenuItem,
  Paper,
  Tooltip,
  Typography,
} from '@mui/material';
import { ReadonlySignal, useComputed, useSignal } from '@preact/signals-react';
import dayjs from 'dayjs';
import { Fragment, useRef } from 'react';
import { borderColor } from '../../constants';
import { User } from '../../types';
import { calendarDateRange } from '../../signals/calendar';
import { TodayVerticalLine } from './TodayVerticalLine';

import { Delete } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { client } from '@team-off/api';
import { useAsync } from 'react-async-hook';
import { usersRequestSignal } from '../../signals/users/index';

type CalendarEvent = User['events'][number] & {
  calendarMetadata: {
    days: number;
  };
};

class AllEvents extends Map<string, YearEvents> {}
class YearEvents extends Map<string, MonthEvents> {}
class MonthEvents extends Map<string, CalendarEvents> {}
type CalendarEvents = CalendarEvent[];

function getOrCreate<K, V>(map: Map<K, V>, key: K, defaultValue: V): V {
  if (!map.has(key)) {
    map.set(key, defaultValue);
  }
  return map.get(key) as V;
}

function getCalendarEvent(
  date: dayjs.Dayjs,
  events: ReadonlySignal<AllEvents>
) {
  return events.value
    .get(date.format('YYYY'))
    ?.get(date.format('MM'))
    ?.get(date.format('DD'))?.[0];
}

function formatTooltip(event: CalendarEvent) {
  return (
    <Box>
      <Typography variant="caption" display="block">
        Start: {dayjs(event.startDate).format('DD/MM/YYYY')}
      </Typography>
      <Typography variant="caption" display="block">
        End: {dayjs(event.endDate).format('DD/MM/YYYY')}
      </Typography>
    </Box>
  );
}

export function CalendarEvent({
  date,
  events,
}: {
  events: ReadonlySignal<AllEvents>;
  date: dayjs.Dayjs;
}) {
  const open = useSignal(false);
  const ref = useRef<HTMLButtonElement | null>(null);
  const calendarEvent = getCalendarEvent(date, events);

  const deleteEventRequest = useAsync(
    async () => {
      if (!calendarEvent?.id) throw new Error('Missing event id');
      await client.delete(`/event/${calendarEvent.id}`);
    },
    [],
    { executeOnMount: false }
  );

  if (!calendarEvent) return null;

  const days = calendarEvent?.calendarMetadata.days as number;
  const widthMultiplier = days + 1;

  function closeMenu() {
    open.value = false;
  }

  return (
    <Box
      position="absolute"
      zIndex={1}
      left={0}
      width={`${widthMultiplier * 100}%`}
      display="flex"
    >
      <Tooltip title={formatTooltip(calendarEvent)} arrow>
        <Paper
          component={motion.button}
          ref={ref}
          variant="outlined"
          sx={{
            cursor: 'pointer',
            display: 'flex',
            zIndex: 1,
            flex: 1,
            m: 1,
            borderLeft: '3px solid',
            borderLeftColor: 'tomato',
          }}
          onClick={() => (open.value = true)}
        >
          <Typography p={1}>{calendarEvent.type}</Typography>
        </Paper>
      </Tooltip>

      <Menu
        anchorEl={ref.current}
        open={open.value}
        onClose={closeMenu}
        slotProps={{ paper: { sx: { mt: 1 } } }}
      >
        <MenuItem
          onClick={async () => {
            await deleteEventRequest.execute();
            await usersRequestSignal.value?.execute();
            closeMenu();
          }}
        >
          <ListItemIcon>
            <Delete fontSize="small" />
          </ListItemIcon>

          <Typography variant="inherit" noWrap>
            Remove event
          </Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
}

export function UserEvents({ user }: { user: User }) {
  const events = useComputed(() => {
    const rangeStart = calendarDateRange.value[0];
    const rangeEnd =
      calendarDateRange.value[calendarDateRange.value.length - 1];

    return user.events.reduce((groupedEvents, event) => {
      const startDate = dayjs(event.startDate);
      const endDate = dayjs(event.endDate);

      const effectiveStart = startDate.isAfter(rangeStart)
        ? startDate
        : rangeStart;

      const effectiveEnd = endDate.isBefore(rangeEnd) ? endDate : rangeEnd;

      const [year, month, day] = effectiveStart.format('YYYY-MM-DD').split('-');

      const yearMap = getOrCreate(groupedEvents, year, new YearEvents());
      const monthMap = getOrCreate(yearMap, month, new MonthEvents());
      const dayEvents = getOrCreate(monthMap, day, [] as CalendarEvents);

      dayEvents.push({
        ...event,
        calendarMetadata: {
          days: effectiveEnd.diff(effectiveStart, 'days'),
        },
      });

      return groupedEvents;
    }, new Map() as AllEvents);
  });

  return (
    <Fragment>
      {calendarDateRange.value.map((date, index) => {
        const isToday = date.isSame(dayjs(), 'date');

        return (
          <Box
            textAlign="center"
            key={index}
            border="1px solid"
            borderTop="none"
            borderLeft={index > 0 ? 'none' : '1px solid'}
            borderBottom="none"
            borderColor={borderColor}
            position="relative"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            {isToday && <TodayVerticalLine />}

            <CalendarEvent events={events} date={date} />
          </Box>
        );
      })}
    </Fragment>
  );
}
