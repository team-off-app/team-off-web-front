import { signal } from '@preact/signals-react';
import { AxiosResponse } from 'axios';
import { UseAsyncReturn } from 'react-async-hook';

import { User } from '../types';

export const usersRequestSignal = signal<
  UseAsyncReturn<AxiosResponse<User[], unknown>, never[]> | undefined
>(undefined);
