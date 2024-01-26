import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class SearchHistoryRepository {
    static async getSearchHistory() {
        try {
            return await prisma.search_history.findMany();
        } catch (err) {
            throw new Error(err);
        }
    }
}

export { SearchHistoryRepository };
