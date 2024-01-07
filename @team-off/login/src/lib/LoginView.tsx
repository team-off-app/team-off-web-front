import {
  Container,
  GlobalStyles,
  Paper,
  Theme,
  Typography,
  useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';
import { LoginForm } from './LoginForm';
import { SignUpFormView } from './SignUpFormView';
import { mode, animationState } from './modeSignal';

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

const motionLocalSettings = () => ({
  transition: { delay: animationState.value === 'initial' ? 1 : 0 },
});

const motionSettings = {
  left: () => ({
    ...motionLocalSettings(),
    initial: {
      x: -1000,
      opacity: animationState.value === 'initial' ? 0 : 1,
    },
    animate: {
      x: 0,
      opacity: 1,
      width: mode.value === 'login' ? '40%' : '60%',
    },
  }),
  right: (theme: Theme) => ({
    ...motionLocalSettings(),
    initial: {
      x: 1000,
      opacity: animationState.value === 'initial' ? 0 : 1,
    },
    animate: {
      x: 0,
      opacity: 1,
      background:
        mode.value === 'signup'
          ? theme.palette.primary.dark
          : theme.palette.white.main,
    },
  }),
};

function LoginViewInnerContent() {
  const theme = useTheme();

  return (
    <Container component="main" sx={{ height: '600px', p: 4, display: 'flex' }}>
      <Paper
        {...motionSettings.left()}
        component={motion.article}
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
        {...motionSettings.right(theme)}
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
