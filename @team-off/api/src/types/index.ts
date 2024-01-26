export type User = {
  id: string;
  name: string;
  photoUrl: string;
  teams: Array<{
    id: string;
    name: string;
  }>;
  events: Array<{
    id: string;
    title: string | null;
    startDate: string;
    endDate: string;
    notes: string | null;
    type: string;
  }>;
};

export type Team = {
  id: string;
  name: string;
};
