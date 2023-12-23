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
} from '@mui/material';
import { open } from '../signals/modal';
import { useSignal } from '@preact/signals-react';
import { DatePicker } from '@mui/x-date-pickers';

/* eslint-disable-next-line */
export interface CreateEventModalProps {}

export function CreateEventModal(props: CreateEventModalProps) {
  const eventType = useSignal('VACATION');

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
          <DatePicker label="Start date" format="DD/MM/YYYY" />

          <DatePicker label="End date" format="DD/MM/YYYY" />

          <FormControl fullWidth>
            <InputLabel id="type">Type</InputLabel>
            <Select value={eventType.value} label="type">
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
          onClick={() => {
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
