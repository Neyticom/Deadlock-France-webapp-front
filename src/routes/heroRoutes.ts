import { Router } from 'express';
import heroController from '../controllers/heroController';
import validationMiddleware from '../middlewares/validationMiddleware';
import heroSchema from '../schemas/hero.schema';

const heroRoutes = Router();

heroRoutes.get('/', heroController.getAllHeroes);
heroRoutes.get('/:id', heroController.getHeroById);
heroRoutes.post('/', validationMiddleware(heroSchema.createHero), heroController.createHero);
heroRoutes.patch('/:id', validationMiddleware(heroSchema.updateHero), heroController.updateHero);
heroRoutes.delete('/:id', heroController.deleteHero);

export default heroRoutes;