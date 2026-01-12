import { Request, Response, NextFunction } from 'express';

interface CustomError extends Error {
  statusCode?: number;
}

export const errorHandler = (
  err: CustomError,
  _req: Request,   // ✅ pakai underscore
  res: Response,
  _next: NextFunction // ✅ pakai underscore
): void => {
  console.error('Error:', err);

  const statusCode = err.statusCode ?? 500;
  const message = err.message || 'Internal Server Error';

  const response: any = {
    success: false,
    message,
  };

  if (process.env.NODE_ENV === 'development') {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
};