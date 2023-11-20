import { Box, Paper, Typography } from '@mui/material';
import { range } from 'lodash';
import { Fragment } from 'react';
import { borderColor, days } from '../../constants';
import { User } from '../../services/users/types';

export function UserEvents({ user }: { user: User }) {
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
          borderBottom="none"
          borderColor={borderColor}
          position="relative"
          display="flex"
          justifyContent="stretch"
          alignItems="center"
          gridColumn="span 1"
        >
          <Paper
            sx={{
              display: 'flex',
              zIndex: 1,
              flex: 1,
            }}
          >
            <Box width="3px" bgcolor="tomato" />
            <Typography p={1}>T</Typography>
          </Paper>
        </Box>
      ))}
    </Fragment>
  );
}
