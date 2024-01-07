import { Add } from '@mui/icons-material';
import { Avatar, Box, Button, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { computed } from '@preact/signals-react';
import { borderColor } from '../../constants';
import { User } from '../../types';

const useDisplayAddButtonOnHover = makeStyles((theme) => ({
  hoverContainer: {
    '&:hover': {
      '& $addButton': {
        visibility: 'visible',
      },
    },
  },
  addButton: {
    visibility: 'hidden',
  },
}));

export function UserData({ user }: { user: User }) {
  const classes = useDisplayAddButtonOnHover();
  const teams = computed(() => user.teams?.map((team) => team.name).join(', '));

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
        <Avatar>H</Avatar>
        <Box display="block">
          <Typography variant="body1">{user.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {teams.value}
          </Typography>
        </Box>
        <Button
          className={classes.addButton}
          sx={{ ml: 'auto', minWidth: 0 }}
          size="small"
          variant="outlined"
        >
          <Add />
        </Button>
      </Box>
    </Box>
  );
}
