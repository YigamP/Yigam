import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class UserRepository {
    static async getUsers({ pageSize, skip }) {
        try {
            return await prisma.user.findMany({
                skip,
                take: pageSize
            });
        } catch (err) {
            throw new Error(err);
        }
    }

    static async getUser({ email }) {
        try {
            return await prisma.user.findUnique({
                where: {
                    email
                }
            });
        } catch (err) {
            throw new Error(err);
        }
    }

    static async getTotalUsers() {
        try {
            return await prisma.user.count();
        } catch (err) {
            throw new Error(err);
        }
    }

    static async createUser(user) {
        try {
            return await prisma.user.create({
                data: {
                    email: user.email,
                    password: user.password,
                    nickname: user.nickname,
                    type: 'normal',
                    role: 'user'
                }
            });
        } catch (err) {
            throw new Error(err);
        }
    }

    static async findUser({ email }) {
        try {
            return await prisma.user.findUnique({
                where: {
                    email
                }
            });
        } catch (err) {
            throw new Error(err);
        }
    }
}

export { UserRepository };
