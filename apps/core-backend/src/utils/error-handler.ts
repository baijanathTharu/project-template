import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { logger } from './logger';

export type TNextError = {
  message: string;
  status: StatusCodes;
};

export function errorHandler(
  err: TNextError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.error(err, 'Caught final exception');
  res.status(err.status || 500).json({ error: err.message });
}

export function customNext(next: NextFunction, arg?: TNextError) {
  if (arg && Object.keys(arg).length) {
    const { message, status } = arg;
    return next({
      message,
      status,
    });
  }

  return next();
}
