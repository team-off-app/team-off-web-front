import { client } from '@team-off/api';
import { persistAccessToken, resetAccessToken } from '@team-off/auth';
import { closeSnackbar, openSnackbar } from '@team-off/snackbar';
import { isAxiosError } from 'axios';
import { useAsync } from 'react-async-hook';

import { mode } from './modeSignal';
import { email, name, password, resetSignUpForm } from './signUpFormSignal';
import { SignUpFormView } from './SignUpFormView';

/* eslint-disable-next-line */
export interface SignUpFormProps {}

export function SignUpForm(props: SignUpFormProps) {
  const signUpRequest = useAsync(
    async () =>
      await client.post('/users', {
        name: name.value,
        login: email.value,
        password: password.value,
      }),
    [],
    { executeOnMount: false },
  );

  async function signUp() {
    try {
      closeSnackbar();
      resetAccessToken();
      const response = await signUpRequest.execute();
      persistAccessToken(response.data.token);
      openSnackbar({
        type: 'success',
        message: 'Account created! Now, you can login.',
      });
      resetSignUpForm();
      mode.value = 'login';
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
    <SignUpFormView
      onSignUpBtnClick={signUp}
      isLoadingSignUpBtn={signUpRequest.status === 'loading'}
    />
  );
}
