import { User } from '@team-off/api';

import { joinTeamModalSignal } from '../signals/modal';

export const openJoinTeamModal = (user: User) => {
  joinTeamModalSignal.value = { open: true, user };
};
