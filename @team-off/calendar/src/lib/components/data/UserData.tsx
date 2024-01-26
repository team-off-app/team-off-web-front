import { Avatar, Box, Button, Menu, Typography } from '@mui/material';
import { computed, signal } from '@preact/signals-react';
import { User } from '@team-off/api';
import { useRef } from 'react';

import { borderColor } from '../../constants';
import { CreateEventMenuItem } from './CreateEventMenuItem';
import { JoinTeamMenuItem } from './JoinTeamMenuItem';
import { LeaveTeamMenuItem } from './LeaveTeamMenuItem';
import classes from './UserData.module.css';

export const selectedUser = signal<string | null>(null);

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
          <CreateEventMenuItem user={user} />
          <JoinTeamMenuItem user={user} />
          <LeaveTeamMenuItem user={user} />
        </Menu>
      </Box>
    </Box>
  );
}
