import { RemoveCircleOutline } from '@mui/icons-material';
import { ListItemIcon, MenuItem, Typography } from '@mui/material';
import { User } from '@team-off/api';
import { openLeaveJoinTeamModal } from '@team-off/leave-team-modal';

import { selectedUser } from './UserData';

export function LeaveTeamMenuItem(props: { user: User }) {
  return (
    <MenuItem
      disabled={props.user?.teams.length === 0}
      onClick={async () => {
        openLeaveJoinTeamModal(props.user);
        selectedUser.value = null;
      }}
    >
      <ListItemIcon>
        <RemoveCircleOutline fontSize="small" />
      </ListItemIcon>
      <Typography variant="inherit" noWrap>
        Leave team
      </Typography>
    </MenuItem>
  );
}
