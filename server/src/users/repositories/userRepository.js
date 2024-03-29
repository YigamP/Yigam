import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class UserRepository {
    static async getUsers({ pageSize, skip }) {
        try {
            return await prisma.user.findMany({
                where: {
                    deleted_at: null
                },
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
            return await prisma.user.count({
                where: {
                    deleted_at: null
                }
            });
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

    static async updateUserRole({ userId, role }) {
        try {
            return await prisma.user.update({
                where: {
                    id: userId
                },
                data: {
                    role: role
                }
            });
        } catch (err) {
            throw new Error(err);
        }
    }

    static async deleteUser({ userId }) {
        try {
            return await prisma.user.update({
                where: {
                    id: userId
                },
                data: {
                    deleted_at: new Date()
                }
            });
        } catch (err) {
            throw new Error(err);
        }
    }
}

export { UserRepository };
