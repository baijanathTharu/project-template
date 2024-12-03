type TPinoLogLevel = 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal';
type TEnvironment = 'prod' | 'dev';

export type TEnv = {
  PORT: string;
  WHITELISTED_ORIGINS: string[];
  PINO_LOG_LEVEL: TPinoLogLevel;
  ENVIRONMENT: TEnvironment;
};
export const env: TEnv = {
  PORT: process.env.PORT ?? '3000',
  WHITELISTED_ORIGINS: process.env.WHITELISTED_ORIGINS?.split(',') ?? [],
  PINO_LOG_LEVEL: (process.env.PINO_LOG_LEVEL as TPinoLogLevel) ?? 'info',
  ENVIRONMENT: (process.env.ENVIRONMENT as TEnvironment) || 'prod',
};
