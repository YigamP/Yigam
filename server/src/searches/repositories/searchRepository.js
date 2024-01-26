import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class UserRepository {
    static async getUsers() {
        try {
            return await prisma.user.findMany();
        } catch (err) {
            throw new Error(err);
        }
    }
}

export { UserRepository };
