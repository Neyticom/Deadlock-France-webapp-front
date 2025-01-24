import { Router } from 'express';
import userController from '../controllers/userController';
import authMiddleware from '../middlewares/authMiddleware';

const userRoutes = Router();

// Accès public (Aucune authentification requise)
userRoutes.post('/', userController.createUser);

// Accès utilisateur authentifié ("User" & "Admin")
userRoutes.get('/', authMiddleware.verifyToken, userController.getAllUsers);
userRoutes.get('/:id', authMiddleware.verifyToken, userController.getUserById);
userRoutes.patch('/:id', authMiddleware.verifyToken, userController.updateUser);
userRoutes.get('/:id/role', authMiddleware.verifyToken, userController.getUserRole);

// Accès réservé aux administrateurs ("Admin" uniquement)
userRoutes.patch('/:id/role', authMiddleware.verifyToken, authMiddleware.verifyAdmin, userController.updateUserRole);
userRoutes.delete('/:id/role', authMiddleware.verifyToken, authMiddleware.verifyAdmin, userController.deleteUserRole);

export default userRoutes;