import { Router } from 'express';
import keywordController from '../controllers/keywordController';

const keywordRoutes = Router();

keywordRoutes.get('/', keywordController.getAllKeywords);
keywordRoutes.get('/:id', keywordController.getKeywordById);
keywordRoutes.post('/', keywordController.createKeyword);
keywordRoutes.patch('/:id', keywordController.updateKeyword);
keywordRoutes.delete('/:id', keywordController.deleteKeyword);

export default keywordRoutes;