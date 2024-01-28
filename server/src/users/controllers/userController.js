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

    static async createUserController(req, res) {
        const { email, password, nickname } = req.body;

        try {
            const result = await UserService.createUser({ email, password, nickname });
            if (result.error) {
                return res.status(400).json({ error: result.error });
            }
            return res.status(201).json({ message: '회원가입이 완료되었습니다.' });
        } catch (err) {
            throw new Error(err);
        }
    }
}

export { UserController };
