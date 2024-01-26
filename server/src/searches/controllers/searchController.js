import { SearchHistoryService } from '../services/searchService.js';

class SearchController {
    static async getSearchHistory(req, res) {
        try {
            const users = await SearchHistoryService.getSearchHistory();
            res.json(users);
        } catch (err) {
            throw new Error(err);
        }
    }
}

export { SearchController };
