import { Alert, Snackbar as RawSnackbar } from '@mui/material';
import { signal } from '@preact/signals-react';

/* eslint-disable-next-line */
export interface SnackbarProps {}

const snackbarOpen = signal<{ open: boolean; message?: string }>({
  open: false,
  message: undefined,
});

export function openSnackbar(message: string) {
  snackbarOpen.value = { open: true, message };
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
      <Alert onClose={closeSnackbar} severity="success" sx={{ width: '100%' }}>
        {snackbarOpen.value.message}
      </Alert>
    </RawSnackbar>
  );
}
