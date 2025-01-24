import type { Request, Response, NextFunction } from "express";
import { Op } from "sequelize";
import User from "../models/User";
import Role from "../models/Role";
import UserHasRole from "../models/UserHasRole";
import logService from "../services/logService";
import cryptoService from "../services/cryptoService";

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

			// Vérifier si un utilisateur existe déjà avec le même login, password, nickname ou email
			const existingUser = await User.findOne({
				where: {
					[Op.or]: [{ login }, { password }, { nickname }, { email }],
				},
			});

			if (existingUser) {
				res.status(409).json({
					error:
						"Un utilisateur avec ce login, password, nickname ou email existe déjà.",
				});
				return;
			}

			// Hasher le mot de passe avant de créer l'utilisateur
			const hashedPassword = await cryptoService.hashPassword(password);

			// Création de l'utilisateur dans une transaction pour éviter l'incrémentation de l'ID en cas d'échec
			const newUser = await User.create({
				login,
				password: hashedPassword,
				firstname,
				lastname,
				nickname,
				email,
				twoFactor,
			});

			// Assigner automatiquement le rôle "User" (id = 2)
			await UserHasRole.create({
				user_id: newUser.getDataValue("id"),
				role_id: 2,
			});

			// Création du log associé
			await logService.createLog(
				newUser.getDataValue("id"),
				"CREATE",
				`User ${newUser.getDataValue("login")} created`,
				req,
			);

			res.status(201).json(newUser);
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		} catch (error: any) {
			if (error.name === "SequelizeUniqueConstraintError") {
				res.status(409).json({ error: "Violation de contrainte unique." });
			} else {
				next(error);
			}
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

			// Vérification si le champ password est présent dans la requête
			if (req.body.password) {
				req.body.password = await cryptoService.hashPassword(req.body.password);
			}

			// Mise à jour des champs fournis dans le body
			await user.update(req.body, { fields: Object.keys(req.body) });

			// Création du log pour suivre la modification de l'utilisateur
			await logService.createLog(
				user.getDataValue("id"),
				"EDIT",
				`User ${user.getDataValue("login")} updated`,
				req,
			);

			res.status(200).json(user);
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

			// Vérifie si l'utilisateur existe
			const user = await User.findByPk(id);
			if (!user) {
				res.status(404).json({ error: "Utilisateur non trouvé." });
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

			if (userRole) {
				// Si le rôle est déjà attribué, on vérifie s'il est identique
				if (userRole.getDataValue("role_id") === newRoleId) {
					res.status(200).json({
						message: "L'utilisateur possède déjà ce rôle.",
						user_id: id,
						role_id: newRoleId,
					});
					return;
				}

				// Suppression de l'ancien rôle avant d'ajouter le nouveau
				await userRole.destroy();
			}

			// Ajoute un nouveau rôle à l'utilisateur
			await UserHasRole.create({ user_id: id, role_id: newRoleId });

			// Récupère la nouvelle relation avec les détails du rôle
			const updatedUserRole = (await UserHasRole.findOne({
				where: { user_id: id },
				include: [{ model: Role, as: "role" }],
				raw: false,
			})) as unknown as { role: Role };

			// Enregistrer la modification du rôle dans les logs
			await logService.createLog(
				Number(id),
				"EDIT",
				`User ${id} role changed to ${newRoleId}`,
				req,
			);

			// Retourne le nouvel état avec un message clair
			res.status(200).json({
				message: "Rôle mis à jour avec succès",
				user_id: id,
				role: updatedUserRole?.role || roleExists,
			});
		} catch (error) {
			console.error("❌ ERROR in updateUserRole:", error);
			next(error);
		}
	},

	// Supprimer le rôle d'un utilisateur (désactiver le compte)
	deleteUserRole: async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			const { id } = req.params;

			// Vérifier si l'utilisateur existe
			const user = await User.findByPk(id);
			if (!user) {
				res.status(404).json({ error: "Utilisateur non trouvé." });
				return;
			}

			// Vérifier si l'utilisateur a un rôle attribué
			const userRole = await UserHasRole.findOne({ where: { user_id: id } });
			if (!userRole) {
				res
					.status(404)
					.json({ error: "L'utilisateur n'a aucun rôle à supprimer." });
				return;
			}

			// Suppression du rôle de l'utilisateur
			await userRole.destroy();

			// Création d'un log pour enregistrer la suppression du rôle
			await logService.createLog(
				user.getDataValue("id"),
				"DELETE",
				`Role removed for user ${user.getDataValue("login")}`,
				req,
			);

			res.status(200).json({
				message: `Rôle de l'utilisateur ${id} supprimé avec succès (compte désactivé).`,
			});
		} catch (error) {
			console.error("❌ ERROR in deleteUserRole:", error);
			next(error);
		}
	},
};

export default userController;
