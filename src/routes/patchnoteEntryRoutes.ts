import { Router } from 'express';
import patchnoteEntryController from '../controllers/patchnoteEntryController';
import validationMiddleware from '../middlewares/validationMiddleware';
import patchnoteEntrySchema from '../schemas/patchnoteEntry.schema';

const patchnoteEntryRoutes = Router();

patchnoteEntryRoutes.get('/:id/entries', patchnoteEntryController.getAllEntries);
patchnoteEntryRoutes.get('/:id/entries/:id', patchnoteEntryController.getEntryById);
patchnoteEntryRoutes.post('/:id/entries', validationMiddleware(patchnoteEntrySchema.createPatchnoteEntry), patchnoteEntryController.createEntry);
patchnoteEntryRoutes.patch('/:id/entries/:id', validationMiddleware(patchnoteEntrySchema.updatePatchnoteEntry), patchnoteEntryController.updateEntry);
patchnoteEntryRoutes.delete('/:id/entries/:id', patchnoteEntryController.deleteEntry);

export default patchnoteEntryRoutes;