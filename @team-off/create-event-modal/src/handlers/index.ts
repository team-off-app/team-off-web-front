import { User } from '@team-off/api';

import { createEventModalSignal } from '../signals/modal';

export const openCreateEventModal = (user: User) => {
  createEventModalSignal.value = { open: true, user };
};
