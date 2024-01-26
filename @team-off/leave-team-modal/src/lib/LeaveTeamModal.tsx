import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { useSignal } from '@preact/signals-react';
import { client, Team, usersRequestSignal } from '@team-off/api';
import { useAsync } from 'react-async-hook';

import { leaveTeamModalSignal } from '../signals/modal';

/* eslint-disable-next-line */
export interface LeaveTeamModalProps {}

export function LeaveTeamModal(props: LeaveTeamModalProps) {
  const selectedTeam = useSignal<string | null>(null);

  const leaveTeamRequest = useAsync(
    async () => {
      if (!selectedTeam.value) return;
      if (!leaveTeamModalSignal.value.user) return;
      const response = await client.delete<Team[]>(
        `/team/${selectedTeam.value}`,
        {
          data: { userId: leaveTeamModalSignal.value.user.id },
        },
      );
      return response.data;
    },
    [],
    { executeOnMount: false },
  );

  return (
    <Dialog
      PaperProps={{ sx: { minWidth: 400 } }}
      open={leaveTeamModalSignal.value.open}
      onClose={() => {
        leaveTeamModalSignal.value = { open: false };
      }}
    >
      <DialogTitle>Leave team</DialogTitle>

      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} py={1}>
          <FormControl>
            <RadioGroup
              value={selectedTeam.value}
              onChange={(e) => (selectedTeam.value = e.target.value)}
            >
              {leaveTeamModalSignal.value.user?.teams.map((team) => (
                <FormControlLabel
                  key={team.id}
                  value={team.id}
                  control={<Radio />}
                  label={team.name}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={() => {
            leaveTeamModalSignal.value = { open: false };
          }}
        >
          Cancel
        </Button>
        <Button
          startIcon={leaveTeamRequest.loading && <CircularProgress size={16} />}
          disabled={leaveTeamRequest.loading}
          onClick={async () => {
            await leaveTeamRequest.execute();
            await usersRequestSignal.value?.execute();
            leaveTeamModalSignal.value = { open: false };
          }}
        >
          Leave
        </Button>
      </DialogActions>
    </Dialog>
  );
}
