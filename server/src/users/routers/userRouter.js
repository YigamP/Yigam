import { Router } from 'express';
import { UserController } from '../controllers/userController.js';

const UserRouter = Router();

UserRouter.get('/', UserController.getUserController);
UserRouter.post('/', UserController.createUserController);
UserRouter.post('/login', UserController.loginUser);

export { UserRouter };
