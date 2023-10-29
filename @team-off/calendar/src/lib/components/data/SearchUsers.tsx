import SearchIcon from '@mui/icons-material/Search';
import { Box, IconButton, InputBase, Paper } from '@mui/material';
import { bgColor, borderColor, searchBoxSpan } from '../../constants';

export function SearchUsers() {
  return (
    <Box
      p={2}
      textAlign="center"
      sx={{ borderTopLeftRadius: 6, borderTopRightRadius: 6 }}
      bgcolor={bgColor}
      gridRow={`span ${searchBoxSpan}`}
      mr={2}
      borderBottom="1px solid"
      borderColor={borderColor}
      display="flex"
    >
      <Paper
        variant="outlined"
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
      >
        <IconButton sx={{ p: '10px' }} aria-label="search" disabled>
          <SearchIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search user"
          inputProps={{ 'aria-label': 'search user' }}
        />
      </Paper>
    </Box>
  );
}
