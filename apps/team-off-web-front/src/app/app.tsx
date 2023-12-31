import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';
import { Calendar } from '@team-off/calendar';
import {
  CreateEventModal,
  CreateEventOpenModalButton,
} from '@team-off/create-event-modal';

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
            <Box display="flex">
              <Typography variant="h6">Team Off</Typography>
              <CreateEventOpenModalButton />
            </Box>
          </Container>
        </Toolbar>
      </AppBar>

      <Container>
        <Box py={3}>
          <Calendar />
        </Box>
      </Container>

      <CreateEventModal />
    </>
  );
}
