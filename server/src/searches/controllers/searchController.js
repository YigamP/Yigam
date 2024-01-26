import { SearchHistoryService } from '../services/searchService.js';

class SearchController {
    static async getSearchHistory(req, res) {
        const page = parseInt(req.query.page) || 1;
        const pageSize = 10;

        try {
            const { searches, totalPages } = await SearchHistoryService.getSearchHistory({
                page,
                pageSize
            });
            res.json({ searches, totalPages });
        } catch (err) {
            throw new Error(err);
        }
    }
}

export { SearchController };
