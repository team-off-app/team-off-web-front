import { GroupAdd } from '@mui/icons-material';
import { ListItemIcon, MenuItem, Typography } from '@mui/material';
import { User } from '@team-off/api';
import { openJoinTeamModal } from '@team-off/join-team-modal';

import { selectedUser } from './UserData';

export function JoinTeamMenuItem({ user }: { user: User }) {
  return (
    <MenuItem
      onClick={async () => {
        openJoinTeamModal(user);
        selectedUser.value = null;
      }}
    >
      <ListItemIcon>
        <GroupAdd fontSize="small" />
      </ListItemIcon>
      <Typography variant="inherit" noWrap>
        Join team
      </Typography>
    </MenuItem>
  );
}
