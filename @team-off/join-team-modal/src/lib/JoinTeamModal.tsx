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
  TextField,
} from '@mui/material';
import { useSignal, useSignalEffect } from '@preact/signals-react';
import {
  client,
  Team,
  teamsRequestSignal,
  useGetTeamsAsyncRequest,
  usersRequestSignal,
} from '@team-off/api';
import { useAsync } from 'react-async-hook';
import { v4 } from 'uuid';

import { joinTeamModalSignal } from '../signals/modal';

/* eslint-disable-next-line */
export interface JoinTeamModalProps {}

const CREATE_NEW_TEAM = v4();

export function JoinTeamModal(props: JoinTeamModalProps) {
  const selectedTeam = useSignal<string | null>(null);
  const teamsRequest = useGetTeamsAsyncRequest();
  const newTeamLabel = useSignal<string>('');

  const joinTeamRequest = useAsync(
    async () => {
      if (!selectedTeam.value) return;
      if (!joinTeamModalSignal.value.user) return;

      const teamId = await (async () => {
        if (selectedTeam.value !== CREATE_NEW_TEAM) return selectedTeam.value;
        const createTeamRequest = await client.post<Team>('/team', {
          name: newTeamLabel.value,
        });
        return createTeamRequest.data.id;
      })();

      const response = await client.put<Team[]>(`/team/${teamId}`, {
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

  useSignalEffect(() => {
    if (selectedTeam.value !== CREATE_NEW_TEAM) {
      newTeamLabel.value = '';
    }
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
          {teamsRequest.loading && <CircularProgress sx={{ margin: 'auto' }} />}

          <FormControl>
            <RadioGroup
              value={selectedTeam.value}
              onChange={(e) => (selectedTeam.value = e.target.value)}
            >
              {teamsRequest.result?.map((team) => (
                <FormControlLabel
                  key={team.id}
                  value={team.id}
                  control={<Radio />}
                  label={team.name}
                />
              ))}

              {!teamsRequest.loading && (
                <FormControlLabel
                  value={CREATE_NEW_TEAM}
                  control={<Radio />}
                  label={
                    <TextField
                      value={newTeamLabel.value}
                      onChange={(e) => (newTeamLabel.value = e.target.value)}
                      variant="outlined"
                      label="Create new team"
                      disabled={selectedTeam.value !== CREATE_NEW_TEAM}
                    />
                  }
                />
              )}
            </RadioGroup>
          </FormControl>
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

            if (selectedTeam.value === CREATE_NEW_TEAM) {
              teamsRequestSignal.value?.execute();
            }

            joinTeamModalSignal.value = { open: false };
            newTeamLabel.value = '';
          }}
        >
          {selectedTeam.value === CREATE_NEW_TEAM ? 'Create & Join' : 'Join'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
