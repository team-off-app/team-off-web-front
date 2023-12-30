import { env } from '@team-off/env';
import axios from 'axios';

export const client = axios.create({
  baseURL: env.VITE_API_BASE_URL,
  headers: {
    Authorization: env.VITE_TOKEN,
  },
});
