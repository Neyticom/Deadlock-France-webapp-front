import { Router } from 'express';
import spellEffectController from '../controllers/spellEffectController';

const spellEffectRoutes = Router();

spellEffectRoutes.get('/:id/effects', spellEffectController.getAllSpellEffects);
spellEffectRoutes.get('/:id/effects/:id', spellEffectController.getSpellEffectById);
spellEffectRoutes.post('/:id/effects', spellEffectController.createSpellEffect);
spellEffectRoutes.patch('/:id/effects/:id', spellEffectController.updateSpellEffect);
spellEffectRoutes.delete('/:id/effects/:id', spellEffectController.deleteSpellEffect);

export default spellEffectRoutes;
