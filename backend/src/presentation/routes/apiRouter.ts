import { Router } from 'express';
import type { UsersController } from '../controllers/index';
import { createUsersRouter } from './usersRoutes';

/**
 * API Router Factory
 * Creates the main API router with all sub-routes
 */
export function createApiRouter(usersController: UsersController): Router {
  const router = Router();

  // Health check endpoint
  router.get('/health', (_req, res) => {
    res.json({
      success: true,
      data: {
        status: 'healthy',
        timestamp: new Date().toISOString(),
      },
    });
  });

  // Mount sub-routers
  router.use('/users', createUsersRouter(usersController));

  return router;
}
