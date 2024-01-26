import { UserRepository } from '../repositories/userRepository.js';

class UserService {
    static async getUserService() {
        try {
            const users = await UserRepository.getUsers();

            return users;
        } catch (err) {
            throw new Error(err);
        }
    }
}

export { UserService };
