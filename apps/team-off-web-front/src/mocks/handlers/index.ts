import dayjs from 'dayjs';
import { delay, http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/users', async () => {
    await delay();
    return HttpResponse.json([
      {
        id: '871f9034-8de8-4254-b6b6-e980e1907e26',
        name: 'Richard Lopes',
        photoUrl: 'richard-lopes.png',
        teams: [
          {
            id: '0308acdf-5d03-4ef6-97df-f3c0effd6d7e',
            name: 'Financeiro',
          },
          {
            id: '532c3f3d-1657-436b-b5b7-f8231c9cfc77',
            name: 'Gerencia',
          },
        ],
        events: [
          {
            id: '196deb57-7e30-4603-b2ac-68904a23df42',
            title: null,
            startDate: dayjs().startOf('day').subtract(5, 'day').toISOString(),
            endDate: dayjs().startOf('day').toISOString(),
            notes: null,
            type: 'VACATION',
          },
          {
            id: 'd3ab5468-f5eb-438e-9d5c-c29af6f56ac3',
            title: null,
            startDate: dayjs().startOf('day').add(1, 'day').toISOString(),
            endDate: dayjs().startOf('day').add(2, 'day').toISOString(),
            notes: null,
            type: 'VACATION',
          },
        ],
      },
      {
        id: '6c97dcd8-5d44-4042-876b-2d753f9847e0',
        name: 'Rodrigo Barbosa',
        photoUrl: 'rodrigo-barbosa.png',
        teams: [
          {
            id: '6ad1a1e4-acef-4f94-a080-1372a0811c6c',
            name: 'Marketing',
          },
          {
            id: '24dd319a-d313-439a-b6a8-9aa033244e29',
            name: 'Tecnologia',
          },
        ],
        events: [
          {
            id: '3cc49fbd-808c-46a9-9cb7-c1576e6f6ded',
            title: null,
            startDate: dayjs().startOf('day').subtract(7, 'day').toISOString(),
            endDate: dayjs().startOf('day').subtract(1, 'day').toISOString(),
            notes: null,
            type: 'VACATION',
          },
          {
            id: '1d68ab41-c142-41e0-8cb3-9cf81556b158',
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
