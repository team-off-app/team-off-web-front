import './mocks/browser';
import '@team-off/error-overlay';

import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import { App } from './app/app';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { startFakebackend } from './mocks/browser';

const theme = createTheme({
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

startFakebackend().then(() =>
  root.render(
    <StrictMode>
      <CssBaseline />

      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </StrictMode>
  )
);
