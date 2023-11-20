import { Avatar, Box, Typography } from '@mui/material';
import { computed } from '@preact/signals-react';
import { bgColor, borderColor } from '../../constants';
import { User } from '../../services/users/types';

export function UserData({ user }: { user: User }) {
  const teams = computed(() => user.teams?.map((team) => team.name).join(', '));

  return (
    <Box bgcolor={bgColor} mr={2}>
      <Box
        display="flex"
        alignItems="center"
        gap={1}
        borderBottom="1px solid"
        borderColor={borderColor}
        mx={2}
        py={2}
      >
        <Avatar>H</Avatar>
        <Box display="block">
          <Typography variant="body1">{user.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {teams.value}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
