import { Router } from 'express';
import { SearchController } from '../controllers/searchController.js';

const SearchRouter = Router();

SearchRouter.get('/', SearchController.getSearchHistory);
SearchRouter.get('/all', SearchController.getAllSearchHistory);
SearchRouter.post('/', SearchController.searchAi);

export { SearchRouter };
