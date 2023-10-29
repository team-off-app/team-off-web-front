import { Box } from '@mui/material';
import { searchBoxSpan, bgColor, borderColor } from '../../constants';

export function SearchUsers() {
  return (
    <Box
      p={2}
      textAlign="center"
      sx={{
        bgcolor: bgColor,
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
      }}
      gridRow={`span ${searchBoxSpan}`}
      mr={2}
      borderBottom="1px solid"
      borderColor={borderColor}
    >
      Search box
    </Box>
  );
}
