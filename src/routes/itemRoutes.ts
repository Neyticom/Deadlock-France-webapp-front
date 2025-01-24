import { Router } from 'express';
import itemController from '../controllers/itemController';
import validationMiddleware from '../middlewares/validationMiddleware';
import itemSchema from '../schemas/item.schema';

const itemRoutes = Router();

itemRoutes.get('/', itemController.getAllItems);
itemRoutes.get('/:id', itemController.getItemById);
itemRoutes.post('/', validationMiddleware(itemSchema.createItem), itemController.createItem);
itemRoutes.patch('/:id', validationMiddleware(itemSchema.updateItem), itemController.updateItem);
itemRoutes.delete('/:id', itemController.deleteItem);

export default itemRoutes;