import { initQueryClient } from '@ts-rest/react-query';
import { todoContract } from '@libs/core-contract/index';
import { env } from '../app/env';

export const todoClient = initQueryClient(todoContract, {
  baseUrl: env.VITE_BACKEND_URL,
  baseHeaders: {},
});
