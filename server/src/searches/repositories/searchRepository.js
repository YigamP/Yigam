import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class SearchHistoryRepository {
    static async getSearchHistory({ pageSize, skip }) {
        try {
            return await prisma.search_history.findMany({
                orderBy: {
                    created_at: 'desc'
                },
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

    static async getAllSearchHistory() {
        try {
            return await prisma.search_history.findMany();
        } catch (err) {
            throw new Error(err);
        }
    }

    static async addSearchData({ content, email, nickname }) {
        try {
            return await prisma.search_history.create({
                data: {
                    user_email: email,
                    nickname,
                    search: content,
                    created_at: new Date()
                }
            });
        } catch (err) {
            throw new Error(err);
        }
    }
}

export { SearchHistoryRepository };
