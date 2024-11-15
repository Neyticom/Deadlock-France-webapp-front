import { Router } from 'express';
import mainController from '../controllers/mainController';

const router = Router();

router.get('/status', mainController.getStatus);

export default router;