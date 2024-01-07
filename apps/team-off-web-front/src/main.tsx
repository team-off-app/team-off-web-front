import '@team-off/error-overlay';
import './mocks/browser';

import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, GlobalStyles } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { getAccessToken } from '@team-off/auth';
import { Login } from '@team-off/login';
import { Snackbar } from '@team-off/snackbar';
import { theme } from '@team-off/theme';
import {
  Navigate,
  Outlet,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { App } from './app/app';
import { startFakebackend } from './mocks/browser';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

function ProtectedLayout() {
  if (!getAccessToken()) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<Login />} />

      <Route path="/" element={<ProtectedLayout />}>
        <Route path="" element={<App />} />
      </Route>
    </>
  )
);

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
