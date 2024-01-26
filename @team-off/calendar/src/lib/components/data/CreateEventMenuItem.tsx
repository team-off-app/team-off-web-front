import { Add } from '@mui/icons-material';
import { ListItemIcon, MenuItem, Typography } from '@mui/material';
import { User } from '@team-off/api';
import { openCreateEventModal } from '@team-off/create-event-modal';

import { selectedUser } from './UserData';

export function CreateEventMenuItem(props: { user: User }) {
  return (
    <MenuItem
      onClick={async () => {
        openCreateEventModal(props.user);
        selectedUser.value = null;
      }}
    >
      <ListItemIcon>
        <Add fontSize="small" />
      </ListItemIcon>
      <Typography variant="inherit" noWrap>
        Create event
      </Typography>
    </MenuItem>
  );
}
