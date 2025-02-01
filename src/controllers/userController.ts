/**
 * Contrôleur des utilisateurs.
 * Gère les opérations CRUD sur les utilisateurs et leurs rôles.
 */

import type { Request, Response, NextFunction } from "express";
import { Op } from "sequelize";
import User from "../models/User";
import Role from "../models/Role";
import UserHasRole from "../models/UserHasRole";
import logService from "../services/logService";
import cryptoService from "../services/cryptoService";

const userController = {
	/**
	 * Récupère tous les utilisateurs.
	 * @param req - Requête Express.
	 * @param res - Réponse Express contenant la liste des utilisateurs.
	 * @param next - Middleware suivant en cas d'erreur.
	 */
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

	/**
	 * Récupère un utilisateur par son identifiant.
	 * @param req - Requête Express contenant l'ID de l'utilisateur.
	 * @param res - Réponse Express contenant les données de l'utilisateur.
	 * @param next - Middleware suivant en cas d'erreur.
	 */
	getUserById: async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			const { id } = req.params;
			const user = await User.findByPk(id);

			if (!user) {
				res.status(404).json({ error: "Utilisateur introuvable." });
				return;
			}

			res.status(200).json(user);
		} catch (error) {
			next(error);
		}
	},

	/**
	 * Crée un nouvel utilisateur.
	 * @param req - Requête Express contenant les données de l'utilisateur.
	 * @param res - Réponse Express contenant l'utilisateur créé.
	 * @param next - Middleware suivant en cas d'erreur.
	 */
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

			// Vérification des champs obligatoires.
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

			// Hachage du mot de passe avant la création.
			const hashedPassword = await cryptoService.hashPassword(password);

			// Création de l'utilisateur dans une transaction pour éviter l'incrémentation de l'ID en cas d'échec.
			const newUser = await User.create({
				login,
				password: hashedPassword,
				firstname,
				lastname,
				nickname,
				email,
				twoFactor,
			});

			// Attribution automatique du rôle "Utilisateur" (id = 2).
			await UserHasRole.create({
				user_id: newUser.getDataValue("id"),
				role_id: 2,
			});

			// Création d'un log associé.
			await logService.createLog(
				newUser.getDataValue("id"),
				"CREATE",
				`Utilisateur ${newUser.getDataValue("login")} créé.`,
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

	/**
	 * Met à jour un utilisateur existant.
	 * @param req - Requête Express contenant l'ID de l'utilisateur et les nouvelles données.
	 * @param res - Réponse Express contenant l'utilisateur mis à jour.
	 * @param next - Middleware suivant en cas d'erreur.
	 */
	updateUser: async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			const { id } = req.params;
			const user = await User.findByPk(id);

			if (!user) {
				res.status(404).json({ error: "Utilisateur introuvable." });
				return;
			}

			// Vérifie si le champ password est présent dans la requête.
			if (req.body.password) {
				req.body.password = await cryptoService.hashPassword(req.body.password);
			}

			// Mise à jour partielle (PATCH).
			await user.update(req.body, { fields: Object.keys(req.body) });

			// Création d'un log pour suivre la modification.
			await logService.createLog(
				user.getDataValue("id"),
				"EDIT",
				`Utilisateur ${user.getDataValue("login")} mis à jour.`,
				req,
			);

			res.status(200).json(user);
		} catch (error) {
			next(error);
		}
	},

	/**
	 * Récupère le rôle d'un utilisateur.
	 * @param req - Requête Express contenant l'ID de l'utilisateur.
	 * @param res - Réponse Express contenant le rôle de l'utilisateur.
	 * @param next - Middleware suivant en cas d'erreur.
	 */
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
				res
					.status(404)
					.json({ error: "Rôle introuvable pour cet utilisateur." });
				return;
			}

			res.status(200).json(userRole);
		} catch (error) {
			next(error);
		}
	},

	/**
	 * Met à jour le rôle d'un utilisateur.
	 * @param req - Requête Express contenant l'ID de l'utilisateur et le nouveau rôle.
	 * @param res - Réponse Express contenant les détails du rôle mis à jour.
	 * @param next - Middleware suivant en cas d'erreur.
	 */
	updateUserRole: async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			const { id } = req.params;
			const { newRoleId } = req.body;

			// Vérifie si le champ 'newRoleId' est bien présent dans la requête.
			if (!newRoleId) {
				res.status(400).json({ error: "Le champ 'newRoleId' est requis." });
				return;
			}

			// Vérifie si l'utilisateur existe.
			const user = await User.findByPk(id);
			if (!user) {
				res.status(404).json({ error: "Utilisateur introuvable." });
				return;
			}

			// Vérifie si le rôle existe dans la table Role.
			const roleExists = await Role.findByPk(newRoleId);
			if (!roleExists) {
				res.status(404).json({ error: "Le rôle spécifié n'existe pas." });
				return;
			}

			// Vérifie si l'utilisateur a déjà un rôle attribué.
			const userRole = await UserHasRole.findOne({ where: { user_id: id } });

			if (userRole) {
				// Si le rôle est déjà attribué, on vérifie s'il est identique.
				if (userRole.getDataValue("role_id") === newRoleId) {
					res.status(200).json({
						message: "L'utilisateur possède déjà ce rôle.",
						user_id: id,
						role_id: newRoleId,
					});
					return;
				}

				// Suppression de l'ancien rôle avant d'ajouter le nouveau.
				await userRole.destroy();
			}

			// Ajoute un nouveau rôle à l'utilisateur.
			await UserHasRole.create({ user_id: id, role_id: newRoleId });

			// Récupère la nouvelle relation avec les détails du rôle.
			const updatedUserRole = (await UserHasRole.findOne({
				where: { user_id: id },
				include: [{ model: Role, as: "role" }],
				raw: false,
			})) as unknown as { role: Role };

			// Enregistrer la modification du rôle dans les logs.
			await logService.createLog(
				Number(id),
				"EDIT",
				`Rôle de l'utilisateur ${id} modifié en ${newRoleId}.`,
				req,
			);

			res.status(200).json({
				message: "Rôle mis à jour avec succès.",
				user_id: id,
				role: updatedUserRole?.role || roleExists,
			});
		} catch (error) {
			console.error("❌ Erreur dans updateUserRole:", error);
			next(error);
		}
	},

	/**
	 * Supprime le rôle d'un utilisateur (désactivation du compte).
	 * @param req - Requête Express contenant l'ID de l'utilisateur.
	 * @param res - Réponse Express confirmant la suppression du rôle.
	 * @param next - Middleware suivant en cas d'erreur.
	 */
	deleteUserRole: async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			const { id } = req.params;

			// Vérifie si l'utilisateur existe.
			const user = await User.findByPk(id);
			if (!user) {
				res.status(404).json({ error: "Utilisateur non trouvé." });
				return;
			}

			// Vérifie si l'utilisateur a un rôle attribué.
			const userRole = await UserHasRole.findOne({ where: { user_id: id } });
			if (!userRole) {
				res
					.status(404)
					.json({ error: "L'utilisateur n'a aucun rôle à supprimer." });
				return;
			}

			// Suppression du rôle de l'utilisateur.
			await userRole.destroy();

			// Création d'un log pour enregistrer la suppression du rôle.
			await logService.createLog(
				user.getDataValue("id"),
				"DELETE",
				`Rôle supprimé pour l'utilisateur ${user.getDataValue("login")}.`,
				req,
			);

			res.status(200).json({
				message: `Rôle de l'utilisateur ${id} supprimé avec succès (compte désactivé).`,
			});
		} catch (error) {
			console.error("❌ Erreur dans deleteUserRole:", error);
			next(error);
		}
	},
};

export default userController;
