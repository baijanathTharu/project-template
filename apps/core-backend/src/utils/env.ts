type TPinoLogLevel = 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal';
type TEnvironment = 'prod' | 'dev';

export type TEnv = {
  PORT: string;
  WHITELISTED_ORIGINS: string[];
  PINO_LOG_LEVEL: TPinoLogLevel;
  ENVIRONMENT: TEnvironment;

  DATABASE_URL: string;

  auth: {
    SALT_ROUNDS: number;
    TOKEN_SECRET: string;
    ACCESS_TOKEN_AGE: number;
    REFRESH_TOKEN_AGE: number;
    OTP_AGE: number;
    OTP_SECRET: string;
  };
};
export const env: TEnv = {
  PORT: process.env.PORT ?? '3000',
  WHITELISTED_ORIGINS: process.env.WHITELISTED_ORIGINS?.split(',') ?? [],
  PINO_LOG_LEVEL: (process.env.PINO_LOG_LEVEL as TPinoLogLevel) ?? 'info',
  ENVIRONMENT: (process.env.ENVIRONMENT as TEnvironment) || 'prod',
  DATABASE_URL: process.env.DATABASE_URL || '',
  auth: {
    SALT_ROUNDS: Number(process.env['SALT_ROUNDS']) || 10,
    TOKEN_SECRET: process.env['TOKEN_SECRET'] || '',
    ACCESS_TOKEN_AGE: Number(process.env['ACCESS_TOKEN_AGE']) || 60000,
    REFRESH_TOKEN_AGE: Number(process.env['REFRESH_TOKEN_AGE']) || 86400000,
    OTP_AGE: Number(process.env['OTP_AGE']) || 50,
    OTP_SECRET: process.env['OTP_SECRET'] || '',
  },
};
