import { Box } from '@mui/material';
import { Fragment } from 'react';
import { borderColor, months } from '../../constants';

export function CalendarMonths() {
  return (
    <Fragment>
      {months.map((month, index) => (
        <Box
          key={month.name}
          p={1}
          gridColumn={`span ${month.days}`}
          textAlign="center"
          border="1px solid"
          borderLeft={index > 0 ? 'none' : '1px solid'}
          borderTop="none"
          borderColor={borderColor}
        >
          {month.name}
        </Box>
      ))}
    </Fragment>
  );
}
