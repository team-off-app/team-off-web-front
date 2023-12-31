import './mocks/browser';
import '@team-off/error-overlay';

import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import { App } from './app/app';
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  GlobalStyles,
} from '@mui/material';
import { startFakebackend } from './mocks/browser';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Login } from '@team-off/login';
import { theme } from '@team-off/theme';
import { Snackbar } from '@team-off/snackbar';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <App />,
  },
]);

startFakebackend().then(() =>
  root.render(
    <StrictMode>
      <CssBaseline />

      <GlobalStyles
        styles={{
          'input:-webkit-autofill': {
            transition: 'background-color 600000s 0s, color 600000s 0s',
          },
          'input:-webkit-autofill:focus': {
            transition: 'background-color 600000s 0s, color 600000s 0s',
          },
          'input[data-autocompleted]': {
            backgroundColor: 'transparent !important',
          },
        }}
      />

      <Snackbar />

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={theme}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </LocalizationProvider>
    </StrictMode>
  )
);
