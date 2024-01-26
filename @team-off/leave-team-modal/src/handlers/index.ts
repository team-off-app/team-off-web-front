import { User } from '@team-off/api';

import { leaveTeamModalSignal } from '../signals/modal';

export const openLeaveJoinTeamModal = (user: User) => {
  leaveTeamModalSignal.value = { open: true, user };
};
