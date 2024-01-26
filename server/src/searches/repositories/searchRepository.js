import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class SearchHistoryRepository {
    static async getSearchHistory({ pageSize, skip }) {
        try {
            return await prisma.search_history.findMany({
                skip,
                take: pageSize
            });
        } catch (err) {
            throw new Error(err);
        }
    }

    static async getTotalSearchHistories() {
        try {
            return await prisma.search_history.count();
        } catch (err) {
            throw new Error(err);
        }
    }
}

export { SearchHistoryRepository };
