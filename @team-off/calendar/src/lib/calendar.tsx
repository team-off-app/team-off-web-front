import { Box, Paper, Typography } from '@mui/material';
import { range } from 'lodash';
import { Fragment } from 'react';

/* eslint-disable-next-line */
export interface CalendarProps {}

const n = 10;

const borderColor = 'grey.400';

const daysPerMonth = 5;

export function Calendar(props: CalendarProps) {
  return (
    <Box
      display="grid"
      gridTemplateColumns={`repeat(${15}, 60px)`}
      overflow="auto"
    >
      <Box
        p={1}
        gridColumn={`span ${daysPerMonth}`}
        textAlign="center"
        border="1px solid"
        borderColor={borderColor}
      ></Box>

      {['March', 'April'].map((month, index) => (
        <Box
          key={month}
          p={1}
          gridColumn={`span ${daysPerMonth}`}
          textAlign="center"
          border="1px solid"
          borderColor={borderColor}
          borderLeft="none"
        >
          {month}
        </Box>
      ))}

      <Box
        gridColumn={`span ${daysPerMonth}`}
        border="1px solid"
        borderTop="none"
        borderColor={borderColor}
      ></Box>

      {range(n).map((index) => (
        <Box
          p={1}
          textAlign="center"
          key={index}
          border="1px solid"
          borderTop="none"
          borderColor={borderColor}
          borderLeft="none"
        >
          <Typography fontWeight="medium">D{index}</Typography>
        </Box>
      ))}

      {range(5).map((_, index) => (
        <Fragment key={index}>
          <Box
            gridColumn={`span ${daysPerMonth}`}
            border="1px solid"
            borderTop="none"
            borderColor={borderColor}
          >
            eu
          </Box>
          {range(n).map((index) => (
            <Box
              p={1}
              textAlign="center"
              key={index}
              border="1px solid"
              borderTop="none"
              borderColor={borderColor}
              borderLeft="none"
              position="relative"
            >
              <Paper sx={{ display: 'flex', zIndex: 1 }}>
                <Box width={2} bgcolor="tomato" m={1} borderRadius="2px" />
                <Typography p={1}>T</Typography>
              </Paper>
            </Box>
          ))}
        </Fragment>
      ))}
    </Box>
  );
}

export default Calendar;
