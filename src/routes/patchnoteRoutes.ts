import { Router } from 'express';
import patchnoteController from '../controllers/patchnoteController';

const patchnoteRoutes = Router();

patchnoteRoutes.get('/', patchnoteController.getAllPatchnotes);
patchnoteRoutes.get('/:id', patchnoteController.getPatchnoteById);
patchnoteRoutes.post('/', patchnoteController.createPatchnote);
patchnoteRoutes.patch('/:id', patchnoteController.updatePatchnote);
patchnoteRoutes.put('/:id', patchnoteController.replacePatchnote);
patchnoteRoutes.delete('/:id', patchnoteController.deletePatchnote);
patchnoteRoutes.get('/search', patchnoteController.searchPatchnotes);

export default patchnoteRoutes;
