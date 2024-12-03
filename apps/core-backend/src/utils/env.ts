import { logger } from './logger';

type TPinoLogLevel = 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal';
type TEnvironment = 'prod' | 'dev';

export type TEnv = {
  PORT: string;
  WHITELISTED_ORIGINS: string[];
  PINO_LOG_LEVEL: TPinoLogLevel;
  ENVIRONMENT: TEnvironment;
  DB_NAME: string;
  DB_USER: string;
  DB_HOST: string;
  DB_PORT: string;
};
export const env: TEnv = {
  PORT: process.env.PORT ?? '3000',
  WHITELISTED_ORIGINS: process.env.WHITELISTED_ORIGINS?.split(',') ?? [],
  PINO_LOG_LEVEL: (process.env.PINO_LOG_LEVEL as TPinoLogLevel) ?? 'info',
  ENVIRONMENT: (process.env.ENVIRONMENT as TEnvironment) || 'prod',
  DB_NAME: process.env.DB_NAME || '',
  DB_USER: process.env.DB_USER || '',
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: process.env.DB_PORT || '5432',
};
