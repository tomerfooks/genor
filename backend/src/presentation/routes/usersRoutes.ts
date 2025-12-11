import { Router } from 'express';
import type { UsersController } from '../controllers/index';

/**
 * Create Users Router
 * Sets up routes for user-related endpoints
 */
export function createUsersRouter(controller: UsersController): Router {
  const router = Router();

  /**
   * GET /users
   * Retrieve all users
   */
  router.get('/', controller.getAll);

  /**
   * GET /users/:id
   * Retrieve a specific user by ID
   */
  router.get('/:id', controller.getById);

  return router;
}
