import { signal } from '@preact/signals-react';
import { User } from './types';

export const users = signal<User[]>([]);
