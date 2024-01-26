import { Router } from 'express';
import { SearchController } from '../controllers/searchController.js';

const SearchRouter = Router();

SearchRouter.get('/', SearchController.getSearchHistory);

export { SearchRouter };
