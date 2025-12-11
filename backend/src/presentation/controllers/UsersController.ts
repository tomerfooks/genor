import type { Request, Response, NextFunction } from 'express';
import type { IGetAllUsersUseCase } from '../../application/index';
import type { IGetUserByIdUseCase } from '../../application/index';
import { NotFoundError, ValidationError } from '../../shared/index';

/**
 * Users Controller
 * Handles HTTP requests for user-related operations
 */
export class UsersController {
  constructor(
    private readonly getAllUsersUseCase: IGetAllUsersUseCase,
    private readonly getUserByIdUseCase: IGetUserByIdUseCase
  ) {}

  /**
   * GET /users
   * Retrieve all users
   */
  getAll = async (
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const result = await this.getAllUsersUseCase.execute();

      res.json({
        success: true,
        data: result.users,
        meta: {
          total: result.total,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * GET /users/:id
   * Retrieve a user by ID
   */
  getById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const id = parseInt(req.params.id, 10);

      if (isNaN(id) || id <= 0) {
        throw new ValidationError('Invalid user ID. Must be a positive integer.');
      }

      const result = await this.getUserByIdUseCase.execute({ id });

      if (!result.user) {
        throw new NotFoundError('User', id);
      }

      res.json({
        success: true,
        data: result.user,
      });
    } catch (error) {
      next(error);
    }
  };
}
