import { Box, Typography } from '@mui/material';
import { Fragment } from 'react';
import { borderColor } from '../../constants';
import { calendarDateRange } from '../../signals/calendar';

export function CalendarDays() {
  return (
    <Fragment>
      {calendarDateRange.value.map((date, index) => (
        <Box
          p={1}
          textAlign="center"
          key={index}
          border="1px solid"
          borderTop="none"
          borderLeft={index > 0 ? 'none' : '1px solid'}
          borderColor={borderColor}
        >
          <Typography fontWeight="medium">{date.date()}</Typography>
        </Box>
      ))}
    </Fragment>
  );
}
