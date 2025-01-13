import { Router } from 'express';
import mainController from '../controllers/mainController';
import heroRoutes from './heroRoutes';
import spellRoutes from './spellRoutes';
import spellEffectRoutes from "./spellEffectRoutes";
import errorHandler from '../middlewares/errorHandler';
import itemRoutes from './itemRoutes';

const router = Router();

router.get('/status', mainController.getStatus);

router.use('/heroes', heroRoutes);
router.use('/spells', spellRoutes);
router.use("/spells/:id/effects", spellEffectRoutes);
router.use('/items', itemRoutes);

router.use(errorHandler);

export default router;