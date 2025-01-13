import { Router } from 'express';
import itemEffectController from '../controllers/itemEffectController';

const itemEffectRoutes = Router();

itemEffectRoutes.get('/:id/effects', itemEffectController.getAllItemEffects);
itemEffectRoutes.get('/:id/effects/:id', itemEffectController.getItemEffectById);
itemEffectRoutes.post('/:id/effects', itemEffectController.createItemEffect);
itemEffectRoutes.patch('/:id/effects/:id', itemEffectController.updateItemEffect);
itemEffectRoutes.delete('/:id/effects/:id', itemEffectController.deleteItemEffect);

export default itemEffectRoutes;