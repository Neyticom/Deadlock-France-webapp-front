import { Router } from 'express';
import userController from '../controllers/userController';

const userRoutes = Router();

// Routes pour les utilisateurs
userRoutes.get('/', userController.getAllUsers);
userRoutes.get('/:id', userController.getUserById);
userRoutes.post('/', userController.createUser);
userRoutes.patch('/:id', userController.updateUser);

// Routes pour la gestion des rôles
userRoutes.get('/:id/role', userController.getUserRole);
userRoutes.patch('/:id/role', userController.updateUserRole);
userRoutes.delete('/:id/role', userController.deleteUserRole);

export default userRoutes;
