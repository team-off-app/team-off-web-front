import { Box } from '@mui/material';
import { indigo } from '@mui/material/colors';

export function TodayVerticalLine() {
  return <Box height="100%" borderLeft="2px solid" borderColor={indigo[500]} />;
}
