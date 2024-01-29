import { SearchHistoryRepository } from '../repositories/searchRepository.js';

class SearchHistoryService {
    static async getSearchHistory({ page, pageSize }) {
        const skip = (page - 1) * pageSize;
        try {
            const searches = await SearchHistoryRepository.getSearchHistory({ pageSize, skip });

            const totalSearchHistoryCount = await SearchHistoryRepository.getTotalSearchHistories();

            const totalPages = Math.ceil(totalSearchHistoryCount / pageSize);

            return { searches, totalPages };
        } catch (err) {
            throw new Error(err);
        }
    }

    static async getAllSearchHistory() {
        try {
            const searches = await SearchHistoryRepository.getAllSearchHistory();

            return searches;
        } catch (err) {
            throw new Error(err);
        }
    }

    static async getSearchAiData({ content }) {
        try {
            await SearchHistoryRepository.addSearchData({ content });
        } catch (err) {
            throw new Error(err);
        }
    }
}

export { SearchHistoryService };
