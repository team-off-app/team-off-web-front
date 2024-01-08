import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { useSignal } from '@preact/signals-react';
import { client , usersRequestSignal } from '@team-off/api';
import dayjs, { Dayjs } from 'dayjs';
import { useAsync } from 'react-async-hook';

import { createEventModalSignal } from '../signals/modal';

/* eslint-disable-next-line */
export interface CreateEventModalProps {}

export function CreateEventModal(props: CreateEventModalProps) {
  const eventType = useSignal('VACATION');
  const startDate = useSignal<Dayjs | null>(dayjs().startOf('day'));
  const endDate = useSignal<Dayjs | null>(dayjs().startOf('day').add(1, 'day'));

  const createEventRequest = useAsync(
    async () => {
      const user = createEventModalSignal.value.user;
      if (!user) throw new Error('User not found');
      await client.post('/event', {
        type: eventType.value,
        userId: user.id,
        startDate: startDate.value?.startOf('day').toISOString(),
        endDate: endDate.value?.startOf('day').toISOString(),
      });
    },
    [],
    { executeOnMount: false }
  );

  return (
    <Dialog
      open={createEventModalSignal.value.open}
      onClose={() => {
        createEventModalSignal.value = { open: false };
      }}
    >
      <DialogTitle>Add event</DialogTitle>

      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} py={1}>
          <DatePicker
            label="Start date"
            format="DD/MM/YYYY"
            value={startDate.value}
            onChange={(newValue) => (startDate.value = newValue)}
          />

          <DatePicker
            label="End date"
            format="DD/MM/YYYY"
            value={endDate.value}
            onChange={(newValue) => (endDate.value = newValue)}
          />

          <FormControl fullWidth>
            <InputLabel id="type">Type</InputLabel>
            <Select
              value={eventType.value}
              label="type"
              onChange={(e) => (eventType.value = e.target.value)}
            >
              <MenuItem value={'VACATION'}>Vacation</MenuItem>
              <MenuItem value={'HOLIDAY'}>Holiday</MenuItem>
              <MenuItem value={'DAY_OFF'}>Day off</MenuItem>
              <MenuItem value={'PERSONAL'}>Personal</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={() => {
            createEventModalSignal.value = { open: false };
          }}
        >
          Cancel
        </Button>
        <Button
          startIcon={
            createEventRequest.loading && <CircularProgress size={16} />
          }
          disabled={createEventRequest.loading}
          onClick={async () => {
            await createEventRequest.execute();
            await usersRequestSignal.value?.execute();
            createEventModalSignal.value = { open: false };
          }}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateEventModal;
