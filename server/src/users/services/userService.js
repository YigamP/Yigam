import { UserRepository } from '../repositories/userRepository.js';

class UserService {
    static async getUsers({ page, pageSize }) {
        const skip = (page - 1) * pageSize;
        try {
            const users = await UserRepository.getUsers({ pageSize, skip });

            const totalUserCount = await UserRepository.getTotalUsers();

            const totalPages = Math.ceil(totalUserCount / pageSize);

            return { users, totalPages };
        } catch (err) {
            throw new Error(err);
        }
    }
}

export { UserService };
