import { SearchHistoryRepository } from '../repositories/searchRepository.js';

class SearchHistoryService {
    static async getSearchHistory() {
        try {
            const users = await SearchHistoryRepository.getSearchHistory();

            return users;
        } catch (err) {
            throw new Error(err);
        }
    }
}

export { SearchHistoryService };
