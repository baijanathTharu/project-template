import pinoLogger from 'pino';
import pinoHttp from 'pino-http';

import { env } from './env';

export const logger =
  env.ENVIRONMENT === 'dev'
    ? pinoLogger({
        level: env.PINO_LOG_LEVEL,
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
          },
        },
      })
    : pinoLogger({
        level: env.PINO_LOG_LEVEL,
      });

export const loggerMiddleware = pinoHttp({
  logger,
});
