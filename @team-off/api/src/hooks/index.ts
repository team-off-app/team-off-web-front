import { useAsync } from 'react-async-hook';

import { client } from '../index';
import { Team } from '../types/index';

export function useGetTeamsAsyncRequest() {
  return useAsync(
    async () => {
      const response = await client.get<Team[]>('/team');
      return response.data;
    },
    [],
    { executeOnMount: false },
  );
}
