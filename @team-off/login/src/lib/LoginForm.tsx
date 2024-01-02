import { client } from '@team-off/api';
import { persistAccessToken, resetAccessToken } from '@team-off/auth';
import { closeSnackbar, openSnackbar } from '@team-off/snackbar';
import { isAxiosError } from 'axios';
import { useAsync } from 'react-async-hook';
import { useNavigate } from 'react-router-dom';
import { LoginFormView } from './LoginFormView';
import { email, password } from './loginFormSignal';

/* eslint-disable-next-line */
export interface LoginProps {}

export function LoginForm(props: LoginProps) {
  const navigate = useNavigate();

  const loginRequest = useAsync(
    async () =>
      client.post<{ token: string }>('/login', {
        login: email.value,
        password: password.value,
      }),
    [],
    { executeOnMount: false }
  );

  async function login() {
    try {
      closeSnackbar();
      resetAccessToken();
      const response = await loginRequest.execute();
      persistAccessToken(response.data.token);
      openSnackbar({ type: 'success', message: 'Welcome!' });
      navigate('/');
    } catch (e) {
      if (isAxiosError(e) && e.response?.status === 403) {
        openSnackbar({
          type: 'error',
          message: 'Invalid credentials',
        });
      } else {
        openSnackbar({
          type: 'error',
          message: ['Something went wrong.', e instanceof Error && e.message]
            .filter(Boolean)
            .join(' '),
        });
      }
    }
  }

  return (
    <LoginFormView
      isLoadingLoginBtn={loginRequest.loading}
      onLoginBtnClick={login}
    />
  );
}
