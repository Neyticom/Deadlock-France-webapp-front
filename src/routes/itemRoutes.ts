import { Router } from 'express';
import itemController from '../controllers/itemController';

const itemRoutes = Router();

itemRoutes.get('/', itemController.getAllItems);
itemRoutes.get('/:id', itemController.getItemById);
itemRoutes.post('/', itemController.createItem);
itemRoutes.patch('/:id', itemController.patchItem);
itemRoutes.delete('/:id', itemController.deleteItem);

export default itemRoutes;
