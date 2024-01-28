import { Router } from 'express';
import { UserController } from '../controllers/userController.js';
import { verifyToken } from '../../middleware/verifyToken.js';

const UserRouter = Router();

UserRouter.get('/', UserController.getUserController);
UserRouter.get('/my', verifyToken, UserController.getMyInfoController);
UserRouter.post('/', UserController.createUserController);
UserRouter.post('/login', UserController.loginUser);

export { UserRouter };
