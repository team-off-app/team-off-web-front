import { Box } from '@mui/material';
import styles from './calendar.module.css';

/* eslint-disable-next-line */
export interface CalendarProps {}

export function Calendar(props: CalendarProps) {
  return (
    <div className={styles['container']}>
      <Box display="grid" gridTemplateColumns="repeat(10, 1fr)">
        {range().map((i) => (
          <Box key={i}>Welcome to Calendar!</Box>
        ))}
      </Box>
    </div>
  );
}

export default Calendar;
