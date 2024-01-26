import { Tab, Tabs } from '@mui/material';
import { signal, useSignalEffect } from '@preact/signals-react';
import { Team, useGetTeamsAsyncRequest } from '@team-off/api';

/* eslint-disable-next-line */
export interface TeamsTabsProps {}

export const ALL_USERS_TAB = 0;

export const tab = signal<{ index: number; team?: Team }>({
  index: ALL_USERS_TAB,
});

export function TeamsTabs(props: TeamsTabsProps) {
  const teamsRequest = useGetTeamsAsyncRequest();

  useSignalEffect(() => {
    teamsRequest.execute();
  });

  return (
    <Tabs
      value={tab.value.index}
      onChange={(_, newValue) => {
        console.log(teamsRequest.result, newValue);
        tab.value = {
          index: newValue,
          team: teamsRequest.result?.[newValue - 1],
        };
      }}
    >
      <Tab label="All users" {...a11yProps('all-users')} />
      {teamsRequest.result?.map((team) => (
        <Tab key={team.id} label={team.name} {...a11yProps(team.id)} />
      ))}
    </Tabs>
  );
}

function a11yProps(index: string) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
