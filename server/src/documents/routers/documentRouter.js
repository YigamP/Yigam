import { Router } from 'express';
import { UserController } from '../controllers/userController.js';

const UserRouter = Router();

UserRouter.get('/', UserController.getUserController);

export { UserRouter };
