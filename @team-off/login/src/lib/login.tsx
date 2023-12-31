import {
  Button,
  Container,
  FormControl,
  GlobalStyles,
  Paper,
  TextField,
  ThemeProvider,
  styled,
  useTheme,
} from '@mui/material';
import { indigo } from '@mui/material/colors';
import { signal, useSignalEffect } from '@preact/signals-react';
import { client } from '@team-off/api';
import { persistAccessToken } from '@team-off/auth';
import { openSnackbar } from '@team-off/snackbar';
import { darkTheme } from '@team-off/theme';
import { motion } from 'framer-motion';
import { useAsync } from 'react-async-hook';
import { Link, useNavigate } from 'react-router-dom';

/* eslint-disable-next-line */
export interface LoginProps {}

const Form = styled('form')(() => ({}));

const canRender = signal(false);
const email = signal('');
const password = signal('');

export function Login(props: LoginProps) {
  const theme = useTheme();

  return (
    <>
      <GlobalStyles
        styles={{
          html: { height: '100%' },
          'body, #root': { minHeight: '100%' },
          body: {
            background: `linear-gradient(to bottom, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
            overflowX: 'hidden',
          },
        }}
      />
      <Content />
    </>
  );
}

function Content() {
  const navigate = useNavigate();

  const { execute: login } = useAsync(
    async () =>
      client.post<{ token: string }>('/login', {
        login: email.value,
        password: password.value,
      }),
    [],
    { executeOnMount: false }
  );

  useSignalEffect(() => {
    setTimeout(() => {
      canRender.value = true;
    }, 1000);
  });

  if (!canRender.value) return null;

  return (
    <Container component="main" sx={{ height: '600px', p: 4, display: 'flex' }}>
      <ThemeProvider theme={darkTheme}>
        <Paper
          component={motion.article}
          initial={{ x: -1000 }}
          animate={{ x: 0 }}
          elevation={20}
          sx={{
            background: indigo['900'],
            height: '100%',
            width: '400px',
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          }}
        >
          <Form
            sx={{
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              p: 4,
            }}
          >
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

            <Button
              variant="contained"
              color="secondary"
              sx={{ mt: 4, borderRadius: 10 }}
              onClick={async () => {
                const response = await login();
                persistAccessToken(response.data.token);
                openSnackbar('Welcome!');
                navigate('/');
              }}
            >
              Login
            </Button>
          </Form>
        </Paper>
      </ThemeProvider>

      <Paper
        component={motion.article}
        elevation={20}
        sx={{
          height: '100%',
          flex: 1,
          p: 4,
          backgroundColor: 'white',
          borderTopRightRadius: 10,
          borderBottomRightRadius: 10,
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
        }}
        initial={{ x: 1000 }}
        animate={{ x: 0 }}
      >
        Team Off
      </Paper>
    </Container>
  );
}
