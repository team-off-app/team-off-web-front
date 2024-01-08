import { Box, Typography } from '@mui/material';
import { Fragment } from 'react';

import { borderColor } from '../../constants';
import { monthsInCalendarDateRange } from '../../signals/calendar';

export function CalendarMonths() {
  return (
    <Fragment>
      {monthsInCalendarDateRange.value.map((month, index) => (
        <Box
          key={index}
          p={1}
          gridColumn={`span ${month.span}`}
          textAlign="left"
          border="1px solid"
          borderLeft={index > 0 ? 'none' : '1px solid'}
          borderTop="none"
          borderColor={borderColor}
        >
          <Typography>{month.name}</Typography>
        </Box>
      ))}
    </Fragment>
  );
}
