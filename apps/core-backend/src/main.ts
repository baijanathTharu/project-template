import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import * as swaggerUi from 'swagger-ui-express';

import { env } from './utils/env';
import { errorHandler } from './utils/error-handler';
import { logger, loggerMiddleware } from './utils/logger';
import { generateEndPoints } from './routers/merge';
import { openApiDocument } from './utils/swagger';

const app = express();

// @ts-expect-error don't know why?
app.use(compression());

app.use(helmet());

logger.debug(env, 'Environment variables');

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
  })
);

app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());

app.use(loggerMiddleware);

app.get('/ping', async (req, res) => {
  res.status(200).send(`Hello!`);
});

// @ts-expect-error may be from library
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocument));

generateEndPoints(app);

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