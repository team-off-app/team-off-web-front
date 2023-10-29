import { Box, Typography } from '@mui/material';
import { range } from 'lodash';
import { Fragment } from 'react';
import { borderColor, days } from '../../constants';

export function CalendarDays() {
  return (
    <Fragment>
      {range(days).map((index) => (
        <Box
          p={1}
          textAlign="center"
          key={index}
          border="1px solid"
          borderTop="none"
          borderLeft={index > 0 ? 'none' : '1px solid'}
          borderColor={borderColor}
        >
          <Typography fontWeight="medium">D{index}</Typography>
        </Box>
      ))}
    </Fragment>
  );
}
