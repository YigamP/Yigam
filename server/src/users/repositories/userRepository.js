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

    static async getTotalUsers() {
        try {
            return await prisma.user.count();
        } catch (err) {
            throw new Error(err);
        }
    }
}

export { UserRepository };
