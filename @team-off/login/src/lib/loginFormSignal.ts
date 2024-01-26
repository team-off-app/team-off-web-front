import { signal } from '@preact/signals-react';

export const email = signal('');
export const password = signal('');

export function resetLoginForm() {
  email.value = '';
  password.value = '';
}
