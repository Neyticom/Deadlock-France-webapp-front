import { Router } from 'express';
import userController from '../controllers/userController';
import validationMiddleware from '../middlewares/validationMiddleware';
import userRoleSchema from '../schemas/userRole.schema';

const userRoutes = Router();

// Routes pour les utilisateurs
userRoutes.get('/', userController.getAllUsers);
userRoutes.get('/:id', userController.getUserById);
userRoutes.post('/', validationMiddleware(userRoleSchema.createUser), userController.createUser);
userRoutes.patch('/:id', validationMiddleware(userRoleSchema.updateUser), userController.updateUser);

// Routes pour la gestion des rôles
userRoutes.get('/:id/role', userController.getUserRole);
userRoutes.patch('/:id/role', validationMiddleware(userRoleSchema.updateUserRole), userController.updateUserRole);
userRoutes.delete('/:id/role', userController.deleteUserRole);

export default userRoutes;
