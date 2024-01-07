import { Box, Typography } from '@mui/material';
import { indigo } from '@mui/material/colors';
import dayjs from 'dayjs';
import { Fragment } from 'react';
import { borderColor } from '../../constants';
import { calendarDateRange } from '../../signals/calendar';
import { TodayVerticalLine } from './TodayVerticalLine';

export function CalendarDays() {
  return (
    <Fragment>
      {calendarDateRange.value.map((date, index) => {
        const isToday = date.isSame(dayjs(), 'date');
        return (
          <Box
            pt={1}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            key={index}
            border="1px solid"
            borderTop="none"
            borderBottom="none"
            borderLeft={index > 0 ? 'none' : '1px solid'}
            borderColor={borderColor}
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              bgcolor={isToday ? indigo[500] : 'transparent'}
              borderRadius="50%"
              p={2}
              height="24px"
              width="24px"
            >
              <Typography
                fontWeight="medium"
                color={isToday ? 'white.main' : 'inherit'}
              >
                {date.date()}
              </Typography>
            </Box>

            {isToday && <TodayVerticalLine />}
          </Box>
        );
      })}
    </Fragment>
  );
}
