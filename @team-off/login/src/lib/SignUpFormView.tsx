import { Box, Button, FormControl, TextField, styled } from '@mui/material';
import { signal } from '@preact/signals-react';
import { darkTheme } from '@team-off/theme';
import { mode } from './modeSignal';
import { ThemeProvider } from '@mui/material/styles';

const Form = styled('form')(() => ({}));

const signUpForm = signal<{ email: string; password: string; name: string }>({
  email: '',
  password: '',
  name: '',
});

export function SignUpFormView() {
  return (
    <Form
      sx={{
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        p: 4,
      }}
    >
      <ThemeProvider theme={darkTheme}>
        <FormControl sx={{ display: 'flex', gap: 2 }}>
          <TextField
            label="Name"
            variant="standard"
            value={signUpForm.value.name}
            onChange={(e) => (signUpForm.value.name = e.target.value)}
          />
          <TextField
            label="Email"
            variant="standard"
            value={signUpForm.value.email}
            onChange={(e) => (signUpForm.value.email = e.target.value)}
          />
          <TextField
            label="Password"
            variant="standard"
            type="password"
            value={signUpForm.value.password}
            onChange={(e) => (signUpForm.value.password = e.target.value)}
          />
        </FormControl>
      </ThemeProvider>

      <Box display="flex" width="100%" mt={4} gap={2}>
        <Button variant="contained" color="white">
          Create account
        </Button>

        <Button
          variant="outlined"
          color="white"
          onClick={() => {
            mode.value = mode.value === 'login' ? 'signup' : 'login';
          }}
        >
          Sign in
        </Button>
      </Box>
    </Form>
  );
}
