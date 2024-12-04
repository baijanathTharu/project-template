type TPinoLogLevel = 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal';
type TEnvironment = 'prod' | 'dev';

export type TEnv = {
  PORT: string;
  WHITELISTED_ORIGINS: string[];
  PINO_LOG_LEVEL: TPinoLogLevel;
  ENVIRONMENT: TEnvironment;

  db: {
    DB_NAME: string;
    DB_USER: string;
    DB_HOST: string;
    DB_PORT: string;
  };

  auth: {
    SALT_ROUNDS: number;
    TOKEN_SECRET: string;
    ACCESS_TOKEN_AGE: number;
    REFRESH_TOKEN_AGE: number;
    EMAIL_VERIFICATION_TOKEN_AGE: number;
  };
};
export const env: TEnv = {
  PORT: process.env.PORT ?? '3000',
  WHITELISTED_ORIGINS: process.env.WHITELISTED_ORIGINS?.split(',') ?? [],
  PINO_LOG_LEVEL: (process.env.PINO_LOG_LEVEL as TPinoLogLevel) ?? 'info',
  ENVIRONMENT: (process.env.ENVIRONMENT as TEnvironment) || 'prod',
  db: {
    DB_NAME: process.env.DB_NAME || '',
    DB_USER: process.env.DB_USER || '',
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_PORT: process.env.DB_PORT || '5432',
  },
  auth: {
    SALT_ROUNDS: Number(process.env['SALT_ROUNDS']) || 10,
    TOKEN_SECRET: process.env['TOKEN_SECRET'] || '',
    ACCESS_TOKEN_AGE: Number(process.env['ACCESS_TOKEN_AGE']) || 60000,
    REFRESH_TOKEN_AGE: Number(process.env['REFRESH_TOKEN_AGE']) || 86400000,
    EMAIL_VERIFICATION_TOKEN_AGE:
      Number(process.env['EMAIL_VERIFICATION_TOKEN_AGE']) || 86400000,
  },
};
