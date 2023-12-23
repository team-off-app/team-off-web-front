import { env } from '@team-off/env';
import axios from 'axios';

export const client = axios.create({
  baseURL: env.VITE_BASE_URL,
  headers: {
    Authorization: `Bearer ${env.VITE_TOKEN}`,
  },
});
