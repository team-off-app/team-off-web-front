import { signal } from '@preact/signals-react';
import { User } from '@team-off/api';

export const createEventModalSignal = signal<
  Readonly<{
    open: boolean;
    user?: User;
  }>
>({
  open: false,
});
