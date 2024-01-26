import { UserService } from '../services/userService.js';

class UserController {
    static async getUserController(req, res) {
        const page = parseInt(req.query.page) || 1;
        const pageSize = 10;

        try {
            const { users, totalPages } = await UserService.getUsers({ page, pageSize });
            res.json({ users, currentPage: page, totalPages });
        } catch (err) {
            throw new Error(err);
        }
    }
}

export { UserController };
