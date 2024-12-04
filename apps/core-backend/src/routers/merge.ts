import { createExpressEndpoints } from '@ts-rest/express';
import { todoContract } from '@libs/core-contract/index';
import { logger } from '@libs/core-contract/utils/logger';

import { todoRouter } from './todo-router';

const routers = [
  {
    contract: todoContract,
    router: todoRouter,
  },
  // add more
];

export function generateEndPoints(app: any) {
  return routers.map(({ contract, router }) => {
    createExpressEndpoints(contract, router, app, {
      logInitialization: true,
      requestValidationErrorHandler(err, req, res, next) {
        logger.error(err, 'Request validation error');
        res.status(400).json({
          error: 'Request validation error',
          isSuccess: false,
          fieldErrors: err.body?.flatten().fieldErrors,
        });
      },
    });
  });
}
