/// <reference types="vite/client" />
import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

export const env = createEnv({
  clientPrefix: 'VITE_',
  client: {
    VITE_TOKEN: z.string().min(1),
    VITE_BASE_URL: z.string().min(1),
    VITE_MOCK_API: z
      .string()
      .refine((value) => value === 'true' || value === 'false'),
  },
  runtimeEnv: import.meta.env,
  emptyStringAsUndefined: true,
});
