import { Router } from 'express';
import itemEffectController from '../controllers/itemEffectController';
import validationMiddleware from '../middlewares/validationMiddleware';
import itemEffectSchema from '../schemas/itemEffect.schema';

const itemEffectRoutes = Router();

itemEffectRoutes.get('/:id/effects', itemEffectController.getAllItemEffects);
itemEffectRoutes.get('/:id/effects/:id', itemEffectController.getItemEffectById);
itemEffectRoutes.post('/:id/effects', validationMiddleware(itemEffectSchema.createItemEffect), itemEffectController.createItemEffect);
itemEffectRoutes.patch('/:id/effects/:id', validationMiddleware(itemEffectSchema.updateItemEffect), itemEffectController.updateItemEffect);
itemEffectRoutes.delete('/:id/effects/:id', itemEffectController.deleteItemEffect);

export default itemEffectRoutes;