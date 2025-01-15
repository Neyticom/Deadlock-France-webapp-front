import { Router } from 'express';
import mainController from '../controllers/mainController';
import heroRoutes from './heroRoutes';
import spellRoutes from './spellRoutes';
import spellEffectRoutes from './spellEffectRoutes';
import itemRoutes from './itemRoutes';
import itemEffectRoutes from './itemEffectRoutes';
import patchnoteRoutes from './patchnoteRoutes';
import patchnoteEntryRoutes from './patchnoteEntryRoutes';
import errorHandler from '../middlewares/errorHandler';
import keywordRoutes from './keywordRoutes';

const router = Router();

router.get('/status', mainController.getStatus);

router.use('/heroes', heroRoutes);

router.use('/spells', spellRoutes);
router.use('/spells', spellEffectRoutes);

router.use('/items', itemRoutes);
router.use('/items', itemEffectRoutes);

router.use('/patchnotes', patchnoteRoutes);
router.use('/patchnotes', patchnoteEntryRoutes);

router.use('/keywords', keywordRoutes);

router.use(errorHandler);

export default router;