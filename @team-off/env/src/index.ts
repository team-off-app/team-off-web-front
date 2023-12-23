/// <reference types="vite/client" />
import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

export const env = createEnv({
  clientPrefix: 'VITE_',
  client: {
    VITE_MOCK_API: z
      .string()
      .refine((value) => value === 'true' || value === 'false'),
  },
  runtimeEnv: import.meta.env,
  emptyStringAsUndefined: true,
});
