import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import * as swaggerUi from 'swagger-ui-express';
import cookieParser from 'cookie-parser';

import { createAuth } from '@libs/auth/index';
import { logger, loggerMiddleware } from '@libs/core-contract/utils/logger';
import { env } from './utils/env';
import { errorHandler, notFoundHandler } from './utils/error-handler';
import { generateEndPoints } from './routers/merge';
import { openApiDocument } from './utils/swagger';

logger.debug(env, 'Environment variables');

const app = express();

// @ts-expect-error don't know why?
app.use(compression());

app.use(helmet());

app.use(
  cors({
    origin: function (origin, callback) {
      logger.debug(`Origin: ${origin}`);
      if (!origin || env.WHITELISTED_ORIGINS.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use(loggerMiddleware);

app.get('/ping', async (req, res) => {
  res.status(200).send(`Hello!`);
});

app.use((req, res, next) => {
  logger.debug({ body: req.body }, 'Request body');
  next();
});

createAuth(app);

// @ts-expect-error may be from library
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocument));

generateEndPoints(app);

app.use(notFoundHandler);

app.use(errorHandler);

const server = app.listen(env.PORT, () => {
  console.log(`[ ready ] http://localhost:${env.PORT}`);
});

process.on('SIGTERM', () => {
  console.debug('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.debug('HTTP server closed');
  });
});

process.on('SIGINT', () => {
  console.debug('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.debug('HTTP server closed');
  });
});
