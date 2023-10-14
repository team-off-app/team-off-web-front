import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';
import cn from 'classnames';

export function App() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Container>
            <Typography variant="h6">Team Off</Typography>
          </Container>
        </Toolbar>
      </AppBar>

      <Container>
        <Typography variant="h1">teste</Typography>
      </Container>
    </>
  );
}
