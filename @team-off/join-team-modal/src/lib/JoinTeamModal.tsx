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
import { useSignal, useSignalEffect } from '@preact/signals-react';
import { client, Team, usersRequestSignal } from '@team-off/api';
import { useAsync } from 'react-async-hook';

import { joinTeamModalSignal } from '../signals/modal';

/* eslint-disable-next-line */
export interface JoinTeamModalProps {}

export function JoinTeamModal(props: JoinTeamModalProps) {
  const selectedTeam = useSignal<string | null>(null);
  const teamsRequest = useAsync(
    async () => {
      const response = await client.get<Team[]>('/team');
      return response.data;
    },
    [],
    { executeOnMount: false },
  );

  const joinTeamRequest = useAsync(
    async () => {
      if (!selectedTeam.value) return;
      if (!joinTeamModalSignal.value.user) return;
      const response = await client.put<Team[]>(`/team/${selectedTeam.value}`, {
        userId: joinTeamModalSignal.value.user.id,
      });
      return response.data;
    },
    [],
    { executeOnMount: false },
  );

  useSignalEffect(() => {
    if (joinTeamModalSignal.value.open) teamsRequest.execute();
  });

  return (
    <Dialog
      PaperProps={{ sx: { minWidth: 400 } }}
      open={joinTeamModalSignal.value.open}
      onClose={() => {
        joinTeamModalSignal.value = { open: false };
      }}
    >
      <DialogTitle>Join team</DialogTitle>

      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} py={1}>
          {teamsRequest.result && (
            <FormControl>
              <RadioGroup
                value={selectedTeam.value}
                onChange={(e) => (selectedTeam.value = e.target.value)}
              >
                {teamsRequest.result.map((team) => (
                  <FormControlLabel
                    key={team.id}
                    value={team.id}
                    control={<Radio />}
                    label={team.name}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          )}
        </Box>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={() => {
            joinTeamModalSignal.value = { open: false };
          }}
        >
          Cancel
        </Button>
        <Button
          startIcon={joinTeamRequest.loading && <CircularProgress size={16} />}
          disabled={joinTeamRequest.loading}
          onClick={async () => {
            await joinTeamRequest.execute();
            await usersRequestSignal.value?.execute();
            joinTeamModalSignal.value = { open: false };
          }}
        >
          Join
        </Button>
      </DialogActions>
    </Dialog>
  );
}
