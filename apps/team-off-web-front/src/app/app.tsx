import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';
import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { Calendar } from '@team-off/calendar';

export function App() {
  return (
    <>
      <AppBar
        position="static"
        color="transparent"
        sx={{
          boxShadow: 'none',
          borderBottom: '1px solid',
          borderColor: 'grey.300',
        }}
      >
        <Toolbar>
          <Container>
            <Typography variant="h6">Team Off</Typography>
          </Container>
        </Toolbar>
      </AppBar>

      <Container>
        <Box py={3}>
          <Calendar />
        </Box>
      </Container>
    </>
  );
}
