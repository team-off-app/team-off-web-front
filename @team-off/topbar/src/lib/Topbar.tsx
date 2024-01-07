import { Delete } from '@mui/icons-material';
import {
  AppBar,
  Avatar,
  Box,
  Container,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import { useSignal } from '@preact/signals-react';
import { resetAccessToken } from '@team-off/auth';
import { useRef } from 'react';

/* eslint-disable-next-line */
export interface TopbarProps {}

export function Topbar(props: TopbarProps) {
  const open = useSignal(false);
  const ref = useRef<HTMLButtonElement | null>(null);

  const closeMenu = () => (open.value = false);
  const openMenu = () => (open.value = true);

  const logout = () => {
    resetAccessToken();
    window.location.reload();
  };

  return (
    <AppBar
      position="static"
      color="transparent"
      sx={{
        boxShadow: 'none',
        borderBottom: '1px solid',
        borderColor: 'grey.300',
      }}
    >
      <Toolbar>
        <Container>
          <Box display="flex">
            <Typography variant="h6">Team Off</Typography>
            <Box ml="auto">
              <IconButton
                ref={ref}
                onClick={openMenu}
                sx={(theme) => ({
                  zIndex: open.value ? theme.zIndex.modal + 1 : 0,
                })}
              >
                <Avatar />
              </IconButton>
            </Box>
          </Box>
        </Container>
      </Toolbar>

      <Menu
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        anchorEl={ref.current}
        open={open.value}
        onClose={closeMenu}
        slotProps={{
          root: { sx: { backgroundColor: 'rgba(0,0,0,0.5)' } },
          paper: { sx: { mt: 1 } },
        }}
      >
        <MenuItem
          onClick={async () => {
            logout();
            closeMenu();
          }}
        >
          <Typography variant="inherit" noWrap>
            Logout
          </Typography>
        </MenuItem>
      </Menu>
    </AppBar>
  );
}

export default Topbar;
