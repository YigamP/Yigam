import { Router } from 'express';
import { SearchController } from '../controllers/searchController.js';
import { verifyToken } from '../../middleware/verifyToken.js';

const SearchRouter = Router();

SearchRouter.get('/', SearchController.getSearchHistory);
SearchRouter.get('/all', SearchController.getAllSearchHistory);
SearchRouter.post('/', verifyToken, SearchController.searchAi);

export { SearchRouter };
