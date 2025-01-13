import { Router } from 'express';
import spellController from '../controllers/spellController';

const spellRoutes = Router();

spellRoutes.get('/', spellController.getAllSpells);
spellRoutes.get('/:id', spellController.getSpellById);
spellRoutes.post('/', spellController.createSpell);
spellRoutes.patch('/:id', spellController.updateSpell);
spellRoutes.delete('/:id', spellController.deleteSpell);

export default spellRoutes;