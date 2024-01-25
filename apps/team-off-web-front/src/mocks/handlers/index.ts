import dayjs from 'dayjs';
import { delay, http, HttpResponse } from 'msw';
import { v4 } from 'uuid';

export const handlers = [
  http.post('/auth/login', async () => {
    return HttpResponse.json({});
  }),
  http.get('/users/events', async () => {
    await delay();
    return HttpResponse.json([
      {
        id: v4(),
        name: 'Richard Lopes',
        photoUrl: 'richard-lopes.png',
        teams: [
          {
            id: v4(),
            name: 'Financeiro',
          },
          {
            id: v4(),
            name: 'Gerencia',
          },
        ],
        events: [
          {
            id: v4(),
            title: null,
            startDate: dayjs().startOf('day').subtract(5, 'day').toISOString(),
            endDate: dayjs().startOf('day').toISOString(),
            notes: null,
            type: 'VACATION',
          },
          {
            id: v4(),
            title: null,
            startDate: dayjs().startOf('day').add(1, 'day').toISOString(),
            endDate: dayjs().startOf('day').add(2, 'day').toISOString(),
            notes: null,
            type: 'VACATION',
          },
        ],
      },
      {
        id: v4(),
        name: 'Rodrigo Barbosa',
        photoUrl: 'rodrigo-barbosa.png',
        teams: [
          {
            id: v4(),
            name: 'Marketing',
          },
          {
            id: v4(),
            name: 'Tecnologia',
          },
        ],
        events: [
          {
            id: v4(),
            title: null,
            startDate: dayjs().startOf('day').subtract(7, 'day').toISOString(),
            endDate: dayjs().startOf('day').subtract(1, 'day').toISOString(),
            notes: null,
            type: 'VACATION',
          },
          {
            id: v4(),
            title: null,
            startDate: dayjs().startOf('day').add(4, 'day').toISOString(),
            endDate: dayjs().startOf('day').add(8, 'day').toISOString(),
            notes: null,
            type: 'VACATION',
          },
        ],
      },
    ]);
  }),
];
