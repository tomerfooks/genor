import type { Request, Response, NextFunction } from 'express';
import { AppError } from '../../shared/index';
import { config } from '../../shared/index';

/**
 * Error Response Interface
 */
interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    stack?: string;
  };
}

/**
 * Global Error Handler Middleware
 * Catches all errors and returns standardized error responses
 */
export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  console.error('Error:', err);

  const response: ErrorResponse = {
    success: false,
    error: {
      code: 'INTERNAL_ERROR',
      message: 'An unexpected error occurred',
    },
  };

  let statusCode = 500;

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    response.error.code = err.code;
    response.error.message = err.message;
  } else if (err instanceof SyntaxError && 'body' in err) {
    // JSON parsing error
    statusCode = 400;
    response.error.code = 'INVALID_JSON';
    response.error.message = 'Invalid JSON in request body';
  }

  // Include stack trace in development
  if (config.NODE_ENV === 'development') {
    response.error.stack = err.stack;
  }

  res.status(statusCode).json(response);
}
