import { Box } from '@mui/material';
import { ReactNode } from 'react';

import { days } from '../../constants';

export function CalendarGrid({ children }: { children: ReactNode }) {
  return (
    <Box
      display="grid"
      gridTemplateColumns={`300px repeat(${days}, minmax(70px, auto))`}
      overflow="auto"
    >
      {children}
    </Box>
  );
}
