import { signal } from '@preact/signals-react';
import { UseAsyncReturn } from 'react-async-hook';

export const usersRequestSignal = signal<
  UseAsyncReturn<void, never[]> | undefined
>(undefined);
