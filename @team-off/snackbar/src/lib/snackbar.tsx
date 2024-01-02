import { Alert, AlertProps, Snackbar as RawSnackbar } from '@mui/material';
import { signal } from '@preact/signals-react';

/* eslint-disable-next-line */
export interface SnackbarProps {}

type SnackbarOptions = {
  message: string;
  type: AlertProps['severity'];
};

const snackbarOpen = signal<{ open: boolean } & Partial<SnackbarOptions>>({
  open: false,
  message: undefined,
});

export function openSnackbar(options: SnackbarOptions) {
  snackbarOpen.value = { ...options, open: true };
}

export function closeSnackbar() {
  snackbarOpen.value = { open: false };
}

export function Snackbar(props: SnackbarProps) {
  return (
    <RawSnackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={snackbarOpen.value.open}
      autoHideDuration={3000}
      onClose={closeSnackbar}
    >
      <Alert
        onClose={closeSnackbar}
        severity={snackbarOpen.value.type}
        sx={{ width: '100%' }}
      >
        {snackbarOpen.value.message}
      </Alert>
    </RawSnackbar>
  );
}
