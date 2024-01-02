import {
  Container,
  GlobalStyles,
  Paper,
  Typography,
  useTheme,
} from '@mui/material';
import { signal, useSignalEffect } from '@preact/signals-react';
import { motion } from 'framer-motion';
import { LoginForm } from './LoginForm';
import { SignUpFormView } from './SignUpFormView';
import { mode } from './modeSignal';

const canRender = signal(false);

export function LoginView() {
  const theme = useTheme();

  return (
    <>
      <GlobalStyles
        styles={{
          html: { height: '100%' },
          'body, #root': { minHeight: '100%' },
          body: {
            background: theme.palette.primary.light,
            overflowX: 'hidden',
          },
        }}
      />
      <LoginViewInnerContent />
    </>
  );
}

function LoginViewInnerContent() {
  const theme = useTheme();

  useSignalEffect(() => {
    setTimeout(() => {
      canRender.value = true;
    }, 1000);
  });

  if (!canRender.value) return null;

  return (
    <Container component="main" sx={{ height: '600px', p: 4, display: 'flex' }}>
      <Paper
        component={motion.article}
        initial={{ x: -1000 }}
        animate={{ x: 0, width: mode.value === 'login' ? '40%' : '60%' }}
        elevation={20}
        sx={{
          background: (theme) =>
            mode.value === 'login'
              ? theme.palette.primary.dark
              : theme.palette.white.main,
          height: '100%',
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
        }}
      >
        {mode.value === 'login' ? <LoginForm /> : <SideContent />}
      </Paper>

      <Paper
        component={motion.article}
        elevation={20}
        sx={{
          height: '100%',
          flex: 1,
          borderTopRightRadius: 10,
          borderBottomRightRadius: 10,
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
        }}
        initial={{ x: 1000 }}
        animate={{
          x: 0,
          background:
            mode.value === 'signup'
              ? theme.palette.primary.dark
              : theme.palette.white.main,
        }}
      >
        {mode.value === 'signup' ? <SignUpFormView /> : <SideContent />}
      </Paper>
    </Container>
  );
}

function SideContent() {
  return (
    <Typography variant="h2" p={4}>
      Team Off
    </Typography>
  );
}
