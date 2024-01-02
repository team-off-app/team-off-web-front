import { signal } from '@preact/signals-react';

export const mode = signal<'login' | 'signup'>('login');
