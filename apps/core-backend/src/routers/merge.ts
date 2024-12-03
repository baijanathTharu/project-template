import { createExpressEndpoints } from '@ts-rest/express';
import { todoContract } from '@libs/core-contract/index';
import { todoRouter } from '../router';
import { logger } from '../utils/logger';

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
