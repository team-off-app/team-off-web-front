import { Box, Paper, Tooltip, Typography } from '@mui/material';
import { Fragment } from 'react';
import { borderColor } from '../../constants';
import { User } from '../../services/users/types';
import dayjs from 'dayjs';
import { TodayVerticalLine } from './TodayVerticalLine';
import { ReadonlySignal, useComputed } from '@preact/signals-react';
import { calendarDateRange } from '../../signals/calendar';

import { motion } from 'framer-motion';

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
      <Box>Start: {dayjs(event.startDate).format('DD/MM/YYYY')}</Box>
      <Box>End: {dayjs(event.endDate).format('DD/MM/YYYY')}</Box>
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
  const calendarEvent = getCalendarEvent(date, events);

  if (!calendarEvent) return null;

  const days = calendarEvent?.calendarMetadata.days as number;
  const widthMultiplier = days + 1;

  return (
    <Box
      position="absolute"
      zIndex={1}
      left={0}
      width={`${widthMultiplier * 100}%`}
      sx={{ cursor: 'pointer' }}
      component={motion.div}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 1 }}
    >
      <Tooltip title={formatTooltip(calendarEvent)} arrow>
        <Paper sx={{ display: 'flex', zIndex: 1, flex: 1, m: 1 }}>
          <Box width="3px" bgcolor="tomato" />
          <Typography p={1}>{calendarEvent.type}</Typography>
        </Paper>
      </Tooltip>
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
