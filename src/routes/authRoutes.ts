import { Router } from "express";
import authController from "../controllers/authController";
import validationMiddleware from '../middlewares/validationMiddleware';
import authSchema from '../schemas/auth.schema';

const authRoutes = Router();

authRoutes.post("/login", validationMiddleware(authSchema.login), authController.login);
authRoutes.get("/logout", authController.logout);

export default authRoutes;