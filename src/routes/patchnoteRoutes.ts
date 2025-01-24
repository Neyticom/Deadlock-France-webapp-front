import { Router } from 'express';
import patchnoteController from '../controllers/patchnoteController';
import validationMiddleware from '../middlewares/validationMiddleware';
import patchnoteSchema from '../schemas/patchnote.schema';

const patchnoteRoutes = Router();

patchnoteRoutes.get('/search', patchnoteController.searchPatchnotes);

patchnoteRoutes.get('/', patchnoteController.getAllPatchnotes);
patchnoteRoutes.get('/:id', patchnoteController.getPatchnoteById);
patchnoteRoutes.post('/', validationMiddleware(patchnoteSchema.createPatchnote), patchnoteController.createPatchnote);
patchnoteRoutes.patch('/:id', validationMiddleware(patchnoteSchema.updatePatchnote), patchnoteController.updatePatchnote);
patchnoteRoutes.put('/:id', validationMiddleware(patchnoteSchema.replacePatchnote), patchnoteController.replacePatchnote);
patchnoteRoutes.delete('/:id', patchnoteController.deletePatchnote);

export default patchnoteRoutes;
