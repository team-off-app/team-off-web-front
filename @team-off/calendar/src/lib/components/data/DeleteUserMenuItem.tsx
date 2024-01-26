import { DeleteForever } from '@mui/icons-material';
import { ListItemIcon, MenuItem, Typography } from '@mui/material';

import { selectedUser } from './UserData';

export function DeleteUserMenuItem() {
  return (
    <MenuItem
      onClick={async () => {
        selectedUser.value = null;
      }}
    >
      <ListItemIcon>
        <DeleteForever fontSize="small" color="error" />
      </ListItemIcon>
      <Typography variant="inherit" noWrap color="error">
        Delete user
      </Typography>
    </MenuItem>
  );
}
