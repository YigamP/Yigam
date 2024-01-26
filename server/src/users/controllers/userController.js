import { UserService } from '../services/userService.js';

class UserController {
    static async getUserController(req, res) {
        try {
            const users = await UserService.getUserService();
            res.json(users);
        } catch (err) {
            throw new Error(err);
        }
    }
}

export { UserController };
