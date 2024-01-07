import SearchIcon from '@mui/icons-material/Search';
import { Box, IconButton, InputBase, Paper } from '@mui/material';
import { signal } from '@preact/signals-react';
import axios from 'axios';
import { borderColor, searchBoxSpan } from '../../constants';

const term = signal('');

export function SearchUsers() {
  return (
    <Box
      p={2}
      textAlign="center"
      sx={{ borderTopLeftRadius: 6, borderTopRightRadius: 6 }}
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
        <Input />
      </Paper>
    </Box>
  );
}

function Input() {
  return (
    <InputBase
      value={term.value}
      onChange={(e) => {
        term.value = e.currentTarget.value;

        axios.get('/users').then((res) => console.log(res.data));
      }}
      sx={{ ml: 1, flex: 1 }}
      placeholder="Search user"
      inputProps={{ 'aria-label': 'search user' }}
    />
  );
}
