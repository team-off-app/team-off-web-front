import { getAccessToken, resetAccessToken } from '@team-off/auth';
import { env } from '@team-off/env';
import axios from 'axios';

export const client = axios.create({
  baseURL: env.VITE_API_BASE_URL,
});

client.interceptors.request.use((config) => {
  config.headers.Authorization = getAccessToken();
  return config;
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 403) {
      resetAccessToken();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export * from './signals';
export * from './types';
