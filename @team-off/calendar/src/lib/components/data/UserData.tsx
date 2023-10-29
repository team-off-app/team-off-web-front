import { Avatar, Box, Typography } from '@mui/material';
import { bgColor, borderColor } from '../../constants';

export function UserData() {
  return (
    <Box bgcolor={bgColor} mr={2}>
      <Box
        display="flex"
        alignItems="center"
        gap={1}
        borderBottom="1px solid"
        borderColor={borderColor}
        mx={2}
        py={2}
      >
        <Avatar>H</Avatar>
        <Box display="block">
          <Typography variant="body1">Linda</Typography>
          <Typography variant="body2" color="text.secondary">
            Digital marketing
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
