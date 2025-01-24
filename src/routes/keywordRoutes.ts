import { Router } from 'express';
import keywordController from '../controllers/keywordController';
import validationMiddleware from '../middlewares/validationMiddleware';
import keywordSchema from '../schemas/keyword.schema';

const keywordRoutes = Router();

keywordRoutes.get('/', keywordController.getAllKeywords);
keywordRoutes.get('/:id', keywordController.getKeywordById);
keywordRoutes.post('/', validationMiddleware(keywordSchema.createKeyword), keywordController.createKeyword);
keywordRoutes.patch('/:id', validationMiddleware(keywordSchema.updateKeyword), keywordController.updateKeyword);
keywordRoutes.delete('/:id', keywordController.deleteKeyword);

export default keywordRoutes;