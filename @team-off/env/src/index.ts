/// <reference types="vite/client" />
import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

export const env = createEnv({
  clientPrefix: 'VITE_',
  client: {
    VITE_API_BASE_URL: z.string().min(1).url(),
    VITE_MOCK_API: z
      .string()
      .refine((value) => value === 'true' || value === 'false')
      .default('false'),
  },
  runtimeEnv: import.meta.env,
  emptyStringAsUndefined: true,
});
