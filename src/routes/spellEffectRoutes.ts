import { Router } from 'express';
import spellEffectController from '../controllers/spellEffectController';
import validationMiddleware from '../middlewares/validationMiddleware';
import spellEffectSchema from '../schemas/spellEffect.schema';

const spellEffectRoutes = Router();

spellEffectRoutes.get('/:id/effects', spellEffectController.getAllSpellEffects);
spellEffectRoutes.get('/:id/effects/:id', spellEffectController.getSpellEffectById);
spellEffectRoutes.post('/:id/effects', validationMiddleware(spellEffectSchema.createSpellEffect), spellEffectController.createSpellEffect);
spellEffectRoutes.patch('/:id/effects/:id', validationMiddleware(spellEffectSchema.updateSpellEffect), spellEffectController.updateSpellEffect);
spellEffectRoutes.delete('/:id/effects/:id', spellEffectController.deleteSpellEffect);

export default spellEffectRoutes;
