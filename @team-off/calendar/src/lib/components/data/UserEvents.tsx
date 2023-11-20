import { Box, Paper, Typography } from '@mui/material';
import { indigo } from '@mui/material/colors';
import { Fragment } from 'react';
import { borderColor } from '../../constants';
import { User } from '../../services/users/types';
import { calendarDateRange } from '../../signals/calendar';
import dayjs from 'dayjs';
import { TodayVerticalLine } from './TodayVerticalLine';

export function UserEvents({ user }: { user: User }) {
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
            gridColumn="span 1"
          >
            {isToday && <TodayVerticalLine />}

            <Box position="absolute" width="100%">
              <Paper
                sx={{
                  display: 'flex',
                  zIndex: 1,
                  flex: 1,
                  m: 1,
                }}
              >
                <Box width="3px" bgcolor="tomato" />
                <Typography p={1}>T</Typography>
              </Paper>
            </Box>
          </Box>
        );
      })}
    </Fragment>
  );
}
