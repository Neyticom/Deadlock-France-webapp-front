import { Router } from 'express';
import patchnoteEntryController from '../controllers/patchnoteEntryController'; 

const patchnoteEntryRoutes = Router();

patchnoteEntryRoutes.get('/:id/entries', patchnoteEntryController.getAllEntries);
patchnoteEntryRoutes.get('/:id/entries/:id', patchnoteEntryController.getEntryById);
patchnoteEntryRoutes.post('/:id/entries', patchnoteEntryController.createEntry);
patchnoteEntryRoutes.patch('/:id/entries/:id', patchnoteEntryController.updateEntry);
patchnoteEntryRoutes.delete('/:id/entries/:id', patchnoteEntryController.deleteEntry);

export default patchnoteEntryRoutes;