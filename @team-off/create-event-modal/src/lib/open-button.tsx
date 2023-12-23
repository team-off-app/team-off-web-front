import { Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import { open } from '../signals/modal';

export function CreateEventOpenModalButton() {
  return (
    <Button
      variant="contained"
      sx={{ marginLeft: 'auto' }}
      startIcon={<Add />}
      onClick={() => {
        open.value = true;
      }}
    >
      Create time off
    </Button>
  );
}
