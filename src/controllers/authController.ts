import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User";
import cryptoService from "../services/cryptoService";

dotenv.config();

const authController = {
	login: async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			const { login, password } = req.body;

			const user = await User.findOne({ where: { login } });

			if (!user) {
				res.status(401).json({ error: "Identifiants incorrects" });
				return;
			}

			const isPasswordValid = await cryptoService.comparePassword(
				password,
				user.getDataValue("password"),
			);

			if (!isPasswordValid) {
				res.status(401).json({ error: "Identifiants incorrects" });
				return;
			}

			const token = jwt.sign(
				{
					id: user.getDataValue("id"),
					login: user.getDataValue("login"),
					role: user.getDataValue("role"),
				},
				process.env.JWT_SECRET as string,
				{ expiresIn: process.env.TOKEN_EXPIRATION || "1h" },
			);

			res.status(200).json({ token });
		} catch (error) {
			next(error);
		}
	},

	logout: async (req: Request, res: Response): Promise<void> => {
		res.status(200).json({ message: "Déconnexion réussie" });
	},
};

export default authController;