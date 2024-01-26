import { client } from '@team-off/api';
import { persistAccessToken, resetAccessToken } from '@team-off/auth';
import { closeSnackbar, openSnackbar } from '@team-off/snackbar';
import { isAxiosError } from 'axios';
import { useAsync } from 'react-async-hook';
import { useNavigate } from 'react-router-dom';

import { email, password, resetLoginForm } from './loginFormSignal';
import { LoginFormView } from './LoginFormView';

/* eslint-disable-next-line */
export interface LoginProps {}

export function LoginForm(props: LoginProps) {
  const navigate = useNavigate();

  const loginRequest = useAsync(
    async () =>
      await client.post<{ token: string }>('/auth/login', {
        login: email.value,
        password: password.value,
      }),
    [],
    { executeOnMount: false },
  );

  async function login() {
    try {
      closeSnackbar();
      resetAccessToken();
      const response = await loginRequest.execute();
      persistAccessToken(response.data.token);
      openSnackbar({ type: 'success', message: 'Welcome!' });
      resetLoginForm();
      navigate('/');
    } catch (e) {
      const message = e instanceof Error && e.message;

      if (isAxiosError(e)) {
        if (e.response?.status === 403) {
          return openSnackbar({
            type: 'error',
            message: 'Invalid credentials',
          });
        }

        return openSnackbar({
          type: 'error',
          message: ['Something went wrong.', e.response?.data?.error ?? message]
            .filter(Boolean)
            .join(' '),
        });
      }

      openSnackbar({
        type: 'error',
        message: ['Something went wrong.', message].filter(Boolean).join(' '),
      });
    }
  }

  return (
    <LoginFormView
      isLoadingLoginBtn={loginRequest.loading}
      onLoginBtnClick={login}
    />
  );
}
