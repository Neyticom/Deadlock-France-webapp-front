import { Router } from 'express';
import patchnoteController from '../controllers/patchnoteController';

const patchnoteRoutes = Router();

patchnoteRoutes.get('/search', patchnoteController.searchPatchnotes);

patchnoteRoutes.get('/', patchnoteController.getAllPatchnotes);
patchnoteRoutes.get('/:id', patchnoteController.getPatchnoteById);
patchnoteRoutes.post('/', patchnoteController.createPatchnote);
patchnoteRoutes.patch('/:id', patchnoteController.updatePatchnote);
patchnoteRoutes.put('/:id', patchnoteController.replacePatchnote);
patchnoteRoutes.delete('/:id', patchnoteController.deletePatchnote);

export default patchnoteRoutes;
