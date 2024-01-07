import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';
import { Calendar } from '@team-off/calendar';
import { CreateEventModal } from '@team-off/create-event-modal';
import { Topbar } from '@team-off/topbar';

export function App() {
  return (
    <>
      <Topbar />

      <Container>
        <Box py={3}>
          <Calendar />
        </Box>
      </Container>

      <CreateEventModal />
    </>
  );
}
