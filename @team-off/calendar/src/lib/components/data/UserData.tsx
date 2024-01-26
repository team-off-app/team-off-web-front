import {
  Add,
  DeleteForever,
  GroupAdd,
  PersonRemove,
  RemoveCircleOutline,
} from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import { computed, signal } from '@preact/signals-react';
import { User } from '@team-off/api';
import { openCreateEventModal } from '@team-off/create-event-modal';
import { openJoinTeamModal } from '@team-off/join-team-modal';
import { useRef } from 'react';

import { borderColor } from '../../constants';
import classes from './UserData.module.css';

const selectedUser = signal<string | null>(null);

export function UserData({ user }: { user: User }) {
  const teams = computed(() => user.teams?.map((team) => team.name).join(', '));
  const ref = useRef<HTMLButtonElement | null>(null);

  return (
    <Box mr={2} className={classes.hoverContainer}>
      <Box
        display="flex"
        alignItems="center"
        gap={1}
        borderBottom="1px solid"
        borderColor={borderColor}
        mx={2}
        py={2}
      >
        <Avatar>{user.name.toUpperCase().charAt(0)}</Avatar>
        <Box display="block">
          <Typography variant="body1">{user.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {teams.value}
          </Typography>
        </Box>
        <Button
          ref={ref}
          className={selectedUser.value === user.id ? '' : classes.addButton}
          sx={{
            ml: 'auto',
            minWidth: 0,
          }}
          size="small"
          variant="outlined"
          onClick={() => (selectedUser.value = user.id)}
        >
          ...
        </Button>

        <Menu
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          anchorEl={ref.current}
          open={selectedUser.value === user.id}
          onClose={() => (selectedUser.value = null)}
          slotProps={{
            paper: { sx: { mt: 1 } },
            root: { sx: { backgroundColor: 'rgba(0,0,0,0.5)' } },
          }}
        >
          <MenuItem
            onClick={async () => {
              openCreateEventModal(user);
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
        </Menu>
      </Box>
    </Box>
  );
}
