import type { Request, Response, NextFunction } from "express";
import User from "../models/User";
import Role from "../models/Role";
import UserHasRole from "../models/UserHasRole";

const userController = {
	// Récupérer tous les utilisateurs
	getAllUsers: async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			const users = await User.findAll();
			res.status(200).json(users);
		} catch (error) {
			next(error);
		}
	},

	// Récupérer un utilisateur par ID
	getUserById: async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			const { id } = req.params;
			const user = await User.findByPk(id);

			if (!user) {
				res.status(404).json({ error: "Utilisateur non trouvé" });
				return;
			}

			res.status(200).json(user);
		} catch (error) {
			next(error);
		}
	},

	// Ajouter un utilisateur
	createUser: async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			const {
				login,
				password,
				firstname,
				lastname,
				nickname,
				email,
				twoFactor,
			} = req.body;

			const newUser = await User.create({
				login,
				password,
				firstname,
				lastname,
				nickname,
				email,
				twoFactor,
			});

			res.status(201).json(newUser);
		} catch (error) {
			next(error);
		}
	},

	// Modifier un utilisateur
	updateUser: async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			const { id } = req.params;
			const user = await User.findByPk(id);

			if (!user) {
				res.status(404).json({ error: "Utilisateur non trouvé" });
				return;
			}

			await user.update(req.body, { fields: Object.keys(req.body) });
			res.status(200).json(user);
		} catch (error) {
			next(error);
		}
	},

	// Supprimer un utilisateur
	deleteUser: async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			const { id } = req.params;
			const user = await User.findByPk(id);

			if (!user) {
				res.status(404).json({ error: "Utilisateur non trouvé" });
				return;
			}

			await user.destroy();
			res.status(200).json({ message: "Utilisateur supprimé" });
		} catch (error) {
			next(error);
		}
	},

	// Récupérer le rôle d'un utilisateur
	getUserRole: async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			const { id } = req.params;

			const userRole = await UserHasRole.findOne({
				where: { user_id: id },
				include: [{ model: Role, as: "role" }],
			});

			if (!userRole) {
				res.status(404).json({ error: "Rôle non trouvé pour cet utilisateur" });
				return;
			}

			res.status(200).json(userRole);
		} catch (error) {
			next(error);
		}
	},

	// Modifier le rôle d'un utilisateur
	updateUserRole: async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			const { id } = req.params;
			const { newRoleId } = req.body;

			// Vérifie si le champ 'newRoleId' est bien présent dans la requête
			if (!newRoleId) {
				res.status(400).json({ error: "Le champ 'newRoleId' est requis." });
				return;
			}

			// Vérifie si le rôle existe dans la table Role
			const roleExists = await Role.findByPk(newRoleId);
			if (!roleExists) {
				res.status(404).json({ error: "Le rôle spécifié n'existe pas." });
				return;
			}

			// Vérifie si l'utilisateur a déjà un rôle attribué
			const userRole = await UserHasRole.findOne({ where: { user_id: id } });
			if (!userRole) {
				res
					.status(404)
					.json({ error: "Aucun rôle trouvé pour cet utilisateur." });
				return;
			}

			// Mise à jour du rôle dans user_has_role
			await userRole.update({ role_id: newRoleId });

			// Retourne le nouvel état avec un message clair
			res.status(200).json({
				message: "Rôle mis à jour avec succès",
				user_id: id,
				role: roleExists, // On renvoie le rôle mis à jour
			});
		} catch (error) {
			next(error);
		}
	},
};

export default userController;
