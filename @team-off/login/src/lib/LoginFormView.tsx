import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  styled,
  TextField,
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { darkTheme } from '@team-off/theme';

import { email, password } from './loginFormSignal';
import { mode } from './modeSignal';

const Form = styled('form')(() => ({}));

type LoginFormViewProps = {
  onLoginBtnClick: () => void;
  isLoadingLoginBtn: boolean;
};

export function LoginFormView(props: LoginFormViewProps) {
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
          disabled={props.isLoadingLoginBtn}
          onClick={props.onLoginBtnClick}
          type="submit"
        >
          {props.isLoadingLoginBtn && (
            <CircularProgress size={24} sx={{ mr: 1 }} />
          )}
          Login
        </Button>

        <Button
          variant="outlined"
          color="white"
          onClick={() => {
            mode.value = mode.value === 'login' ? 'signup' : 'login';
          }}
        >
          Sign up
        </Button>
      </Box>
    </Form>
  );
}
