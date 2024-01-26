import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  styled,
  TextField,
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { signal } from '@preact/signals-react';
import { darkTheme } from '@team-off/theme';

import { mode } from './modeSignal';
import { email, name, password } from './signUpFormSignal';

const Form = styled('form')(() => ({}));

type SignUpFormViewProps = {
  onSignUpBtnClick: () => void;
  isLoadingSignUpBtn: boolean;
};

export function SignUpFormView(props: SignUpFormViewProps) {
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
            value={name.value}
            onChange={(e) => (name.value = e.target.value)}
          />
          <TextField
            label="Email"
            variant="standard"
            value={email.value}
            onChange={(e) => (email.value = e.target.value)}
          />
          <TextField
            label="Password"
            variant="standard"
            type="password"
            value={password.value}
            onChange={(e) => (password.value = e.target.value)}
          />
        </FormControl>
      </ThemeProvider>

      <Box display="flex" width="100%" mt={4} gap={2}>
        <Button
          variant="contained"
          color="white"
          disabled={props.isLoadingSignUpBtn}
          onClick={() => {
            props.onSignUpBtnClick();
          }}
        >
          {props.isLoadingSignUpBtn && (
            <CircularProgress size={24} sx={{ mr: 1 }} />
          )}
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
