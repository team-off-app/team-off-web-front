import { Box, Paper, Typography } from '@mui/material';
import { range } from 'lodash';

/* eslint-disable-next-line */
export interface CalendarProps {}

const n = 10;

export function Calendar(props: CalendarProps) {
  return (
    <Box
      display="grid"
      gridTemplateColumns={`repeat(${n}, 60px)`}
      gridTemplateRows={`repeat(3)`}
      overflow="auto"
    >
      <Box
        p={1}
        gridColumn="span 5"
        textAlign="center"
        border="1px solid"
        borderLeft={'1px solid'}
        borderColor="grey.200"
      >
        March
      </Box>
      <Box
        p={1}
        gridColumn="span 5"
        textAlign="center"
        border="1px solid"
        borderLeft={'none'}
        borderColor="grey.200"
      >
        April
      </Box>

      {range(n).map((index) => (
        <Box
          p={1}
          textAlign="center"
          key={index}
          border="1px solid"
          borderLeft={index > 0 ? 'none' : '1px solid'}
          borderTop="none"
          borderColor="grey.200"
        >
          <Typography fontWeight="medium">{index}</Typography>
        </Box>
      ))}

      {range(n).map((index) => (
        <Box
          p={1}
          height="600px"
          textAlign="center"
          key={index}
          border="1px solid"
          borderLeft={index > 0 ? 'none' : '1px solid'}
          borderTop="none"
          borderColor="grey.200"
          position="relative"
        >
          {[0, 1].includes(index) && (
            <Paper
              sx={{
                display: 'flex',
                position: 'absolute',
                zIndex: 1,
              }}
            >
              <Box width={2} bgcolor="tomato" m={1} borderRadius="2px" />
              <Typography p={1}>Testeasdfasdfadsf</Typography>
            </Paper>
          )}
        </Box>
      ))}
    </Box>
  );
}

export default Calendar;
