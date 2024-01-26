import { RemoveCircleOutline } from '@mui/icons-material';
import { ListItemIcon, MenuItem, Typography } from '@mui/material';

import { selectedUser } from './UserData';

export function LeaveTeamMenuItem() {
  return (
    <MenuItem
      onClick={async () => {
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
