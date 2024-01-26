import { signal } from '@preact/signals-react';

export const name = signal('');
export const email = signal('');
export const password = signal('');

export function resetSignUpForm() {
  name.value = '';
  email.value = '';
  password.value = '';
}
