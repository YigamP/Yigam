/* eslint-disable no-undef */
import { UserRepository } from '../repositories/userRepository.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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
    static async getUser({ email }) {
        try {
            const user = await UserRepository.getUser({ email });

            return user;
        } catch (err) {
            throw new Error(err);
        }
    }

    static async createUser({ email, password, nickname }) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        try {
            const user = {
                email,
                password: hash,
                nickname
            };
            const validation = await UserRepository.findUser({ email });
            if (validation) {
                return { error: '이미 존재하는 이메일 입니다.' };
            } else {
                const result = await UserRepository.createUser(user);
                return result;
            }
        } catch (err) {
            throw new Error(err);
        }
    }

    static async loginUser({ email, password }) {
        const jwt_key = process.env.JWT_KEY;
        try {
            const user = await UserRepository.findUser({ email });
            if (!user) {
                return { error: '존재하지 않는 이메일 입니다.' };
            } else {
                const isPasswordCorrect = await bcrypt.compare(password, user.password);

                if (isPasswordCorrect) {
                    const token = jwt.sign(
                        { userEmail: user.email, userNickname: user.nickname },
                        jwt_key,
                        { expiresIn: '24h' }
                    );
                    return { token, user };
                } else {
                    return { error: '비밀번호가 일치하지 않습니다.' };
                }
            }
        } catch (err) {
            throw new Error(err);
        }
    }

    static async changeUser({ userId, role }) {
        try {
            await UserRepository.updateUserRole({ userId, role });
        } catch (err) {
            throw new Error(err);
        }
    }

    static async deleteUser({ userId }) {
        try {
            await UserRepository.deleteUser({ userId });
        } catch (err) {
            throw new Error(err);
        }
    }
}

export { UserService };
