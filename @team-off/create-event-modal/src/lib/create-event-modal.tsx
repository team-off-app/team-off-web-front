import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  CircularProgress,
} from '@mui/material';
import { open } from '../signals/modal';
import { useSignal } from '@preact/signals-react';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { client } from '@team-off/api';
import { useAsync } from 'react-async-hook';

/* eslint-disable-next-line */
export interface CreateEventModalProps {}

export function CreateEventModal(props: CreateEventModalProps) {
  const eventType = useSignal('VACATION');
  const startDate = useSignal<Dayjs | null>(dayjs().startOf('day'));
  const endDate = useSignal<Dayjs | null>(dayjs().startOf('day').add(1, 'day'));

  const createEventRequest = useAsync(
    async () => {
      await client.post('/event', {
        type: eventType.value,
        // TODO hardcoded
        userId: '68fede71-d80f-4688-bf33-6a45fdacf134',
        startDate: startDate.value?.startOf('day').toISOString(),
        endDate: endDate.value?.startOf('day').toISOString(),
        title: 'Teste 1',
        notes: '',
      });
    },
    [],
    { executeOnMount: false }
  );

  return (
    <Dialog
      open={open.value}
      onClose={() => {
        open.value = false;
      }}
    >
      <DialogTitle>Add event</DialogTitle>

      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} py={1}>
          {startDate.value?.format('DD/MM/YYYY')}
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
            open.value = false;
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
            open.value = false;
          }}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateEventModal;
