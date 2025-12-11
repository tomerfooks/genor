import express, { type Application, type Request, type Response } from 'express';
import cors from 'cors';

import { config } from '../shared/index';
import {
  FetchHttpClient,
  JsonPlaceholderUserRepository,
} from '../infrastructure/index';
import { GetAllUsersUseCase, GetUserByIdUseCase } from '../application/index';
import {
  UsersController,
  createApiRouter,
  errorHandler,
  requestLogger,
} from '../presentation/index';

/**
 * Application Factory
 * Creates and configures the Express application with all dependencies
 */
export function createApp(): Application {
  const app = express();

  // ===================
  // Middleware
  // ===================
  app.use(cors({ origin: config.CORS_ORIGIN }));
  app.use(express.json());
  app.use(requestLogger);

  // ===================
  // Dependency Injection
  // ===================

  // Infrastructure Layer
  const httpClient = new FetchHttpClient(config.JSON_PLACEHOLDER_BASE_URL);
  const userRepository = new JsonPlaceholderUserRepository(httpClient);

  // Application Layer (Use Cases)
  const getAllUsersUseCase = new GetAllUsersUseCase(userRepository);
  const getUserByIdUseCase = new GetUserByIdUseCase(userRepository);

  // Presentation Layer (Controllers)
  const usersController = new UsersController(
    getAllUsersUseCase,
    getUserByIdUseCase
  );

  // ===================
  // Routes
  // ===================
  app.use('/api', createApiRouter(usersController));

  // Root endpoint
  app.get('/', (_req: Request, res: Response) => {
    res.json({
      success: true,
      data: {
        name: 'Genor Backend API',
        version: '1.0.0',
        docs: '/api/health',
      },
    });
  });

  // ===================
  // Error Handling
  // ===================
  app.use(errorHandler);

  // 404 handler
  app.use((_req: Request, res: Response) => {
    res.status(404).json({
      success: false,
      error: {
        code: 'NOT_FOUND',
        message: 'Endpoint not found',
      },
    });
  });

  return app;
}
