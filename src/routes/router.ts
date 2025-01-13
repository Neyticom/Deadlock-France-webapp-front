import { Router } from 'express';
import mainController from '../controllers/mainController';
import heroRoutes from './heroRoutes';
import spellRoutes from './spellRoutes';
import errorHandler from '../middlewares/errorHandler';

const router = Router();

router.get('/status', mainController.getStatus);

router.use('/heroes', heroRoutes);
router.use('/spells', spellRoutes);

router.use(errorHandler);

export default router;