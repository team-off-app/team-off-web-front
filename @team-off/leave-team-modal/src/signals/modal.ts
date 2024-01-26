import { signal } from '@preact/signals-react';
import { User } from '@team-off/api';

export const leaveTeamModalSignal = signal<
  Readonly<{
    open: boolean;
    user?: User;
  }>
>({
  open: false,
});
