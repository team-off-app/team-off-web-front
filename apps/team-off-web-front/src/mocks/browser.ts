import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';
import { env } from '@team-off/env';

export const worker = setupWorker(...handlers);

export async function startFakebackend() {
  if (env.VITE_MOCK_API === 'true') {
    worker.start();
  }
}
