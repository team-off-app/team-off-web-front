import { createTheme } from '@mui/material';
import { indigo, red } from '@mui/material/colors';

export const theme = createTheme({
  components: {
    MuiButton: { defaultProps: { disableElevation: true } },
  },
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
  palette: {
    primary: indigo,
    secondary: red,
  },
});

export const darkTheme = createTheme({
  ...theme,
  palette: {
    mode: 'dark',
  },
});
