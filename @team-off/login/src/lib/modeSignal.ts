import { effect, signal } from '@preact/signals-react';

export const mode = signal<'login' | 'signup'>('login');

export const animationState = signal<'initial' | 'after'>('initial');

effect(() => {
  if (mode.value === 'signup') {
    animationState.value = 'after';
  }
});
