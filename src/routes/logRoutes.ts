import { Router } from 'express';
import logController from '../controllers/logController';

const logRoutes = Router();

logRoutes.get('/search', logController.searchLogs);
logRoutes.get('/', logController.getAllLogs);
logRoutes.get('/:id', logController.getLogById);

export default logRoutes;