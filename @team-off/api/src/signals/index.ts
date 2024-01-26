import { signal } from '@preact/signals-react';
import { AxiosResponse } from 'axios';
import { UseAsyncReturn } from 'react-async-hook';

import { Team, User } from '../types';

export const usersRequestSignal = signal<
  | UseAsyncReturn<AxiosResponse<User[], unknown> | undefined, number[]>
  | undefined
>(undefined);

export const teamsRequestSignal = signal<
  UseAsyncReturn<Team[], never[]> | undefined
>(undefined);
