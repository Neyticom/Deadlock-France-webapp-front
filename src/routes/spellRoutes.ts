import { Router } from 'express';
import spellController from '../controllers/spellController';
import validationMiddleware from '../middlewares/validationMiddleware';
import spellSchema from '../schemas/spell.schema';

const spellRoutes = Router();

spellRoutes.get('/', spellController.getAllSpells);
spellRoutes.get('/:id', spellController.getSpellById);
spellRoutes.post('/', validationMiddleware(spellSchema.createSpell), spellController.createSpell);
spellRoutes.patch('/:id', validationMiddleware(spellSchema.updateSpell), spellController.updateSpell);
spellRoutes.delete('/:id', spellController.deleteSpell);

export default spellRoutes;