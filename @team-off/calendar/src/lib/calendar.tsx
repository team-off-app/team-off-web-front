import { Avatar, Box, Paper, Typography } from '@mui/material';
import { lightBlue } from '@team-off/theme';
import { range } from 'lodash';
import { Fragment } from 'react';

/* eslint-disable-next-line */
export interface CalendarProps {}

const borderColor = lightBlue['100'];
const bgColor = lightBlue['50'];

const months = [
  {
    name: 'Janeiro',
    days: 5,
  },
  {
    name: 'Fevereiro',
    days: 5,
  },
  {
    name: 'Março',
    days: 2,
  },
];

const days = months.reduce((acc, month) => acc + month.days, 0);

const searchBoxSpan = ['MONTHS', 'DAYS'].length;

export function Calendar(props: CalendarProps) {
  return (
    <Box
      display="grid"
      gridTemplateColumns={`300px repeat(${days}, minmax(70px, auto))`}
      overflow="auto"
    >
      <Box
        p={2}
        textAlign="center"
        sx={{
          bgcolor: bgColor,
          borderTopLeftRadius: 6,
          borderTopRightRadius: 6,
        }}
        gridRow={`span ${searchBoxSpan}`}
        mr={2}
        borderBottom="1px solid"
        borderColor={borderColor}
      >
        Search box
      </Box>

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

      {range(5).map((_, index) => (
        <Fragment key={index}>
          <Box bgcolor={bgColor} mr={2}>
            <Box
              display="flex"
              alignItems="center"
              gap={1}
              borderBottom="1px solid"
              borderColor={borderColor}
              mx={2}
              py={2}
            >
              <Avatar>H</Avatar>
              <Box display="block">
                <Typography variant="body1">Linda</Typography>
                <Typography variant="body2" color="text.secondary">
                  Digital marketing
                </Typography>
              </Box>
            </Box>
          </Box>

          {range(days).map((index) => (
            <Box
              p={1}
              textAlign="center"
              key={index}
              border="1px solid"
              borderTop="none"
              borderLeft={index > 0 ? 'none' : '1px solid'}
              borderBottom="none"
              borderColor={borderColor}
              position="relative"
              display="flex"
              justifyContent="stretch"
              alignItems="center"
            >
              <Paper sx={{ display: 'flex', zIndex: 1, flex: 1 }}>
                <Box width="3px" bgcolor="tomato" />
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
