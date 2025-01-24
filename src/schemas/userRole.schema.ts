import Joi from "joi";

const userRoleSchema = {
	createUser: Joi.object({
		login: Joi.string().min(3).max(32).required().messages({
			"string.min": "Le login doit contenir au moins {#limit} caractères.",
			"string.max": "Le login ne peut pas dépasser {#limit} caractères.",
			"any.required": "Le login est obligatoire.",
		}),
		password: Joi.string().min(8).max(96).required().messages({
			"string.min":
				"Le mot de passe doit contenir au moins {#limit} caractères.",
			"string.max": "Le mot de passe ne peut pas dépasser {#limit} caractères.",
			"any.required": "Le mot de passe est obligatoire.",
		}),
		firstname: Joi.string().min(2).max(64).required().messages({
			"string.min": "Le prénom doit contenir au moins {#limit} caractères.",
			"string.max": "Le prénom ne peut pas dépasser {#limit} caractères.",
			"any.required": "Le prénom est obligatoire.",
		}),
		lastname: Joi.string().min(2).max(64).required().messages({
			"string.min":
				"Le nom de famille doit contenir au moins {#limit} caractères.",
			"string.max":
				"Le nom de famille ne peut pas dépasser {#limit} caractères.",
			"any.required": "Le nom de famille est obligatoire.",
		}),
		nickname: Joi.string().min(2).max(64).required().messages({
			"string.min": "Le pseudo doit contenir au moins {#limit} caractères.",
			"string.max": "Le pseudo ne peut pas dépasser {#limit} caractères.",
			"any.required": "Le pseudo est obligatoire.",
		}),
		email: Joi.string().email().max(320).required().messages({
			"string.email": "L’email doit être un email valide.",
			"string.max": "L’email ne peut pas dépasser {#limit} caractères.",
			"any.required": "L’email est obligatoire.",
		}),
		twoFactor: Joi.boolean().required().messages({
			"any.required": "Le champ 2FA est obligatoire.",
		}),
	}),

	updateUser: Joi.object({
		login: Joi.string().min(3).max(32).messages({
			"string.min": "Le login doit contenir au moins {#limit} caractères.",
			"string.max": "Le login ne peut pas dépasser {#limit} caractères.",
		}),
		password: Joi.string().min(8).max(96).messages({
			"string.min":
				"Le mot de passe doit contenir au moins {#limit} caractères.",
			"string.max": "Le mot de passe ne peut pas dépasser {#limit} caractères.",
		}),
		firstname: Joi.string().min(2).max(64).messages({
			"string.min": "Le prénom doit contenir au moins {#limit} caractères.",
			"string.max": "Le prénom ne peut pas dépasser {#limit} caractères.",
		}),
		lastname: Joi.string().min(2).max(64).messages({
			"string.min":
				"Le nom de famille doit contenir au moins {#limit} caractères.",
			"string.max":
				"Le nom de famille ne peut pas dépasser {#limit} caractères.",
		}),
		nickname: Joi.string().min(2).max(64).messages({
			"string.min": "Le pseudo doit contenir au moins {#limit} caractères.",
			"string.max": "Le pseudo ne peut pas dépasser {#limit} caractères.",
		}),
		email: Joi.string().email().max(320).messages({
			"string.email": "L’email doit être un email valide.",
			"string.max": "L’email ne peut pas dépasser {#limit} caractères.",
		}),
		twoFactor: Joi.boolean(),
	}),

	updateUserRole: Joi.object({
		newRoleId: Joi.number().integer().required().messages({
			"number.integer": "Le rôle doit être un entier.",
			"any.required": "Le rôle est obligatoire.",
		}),
	}),
};

export default userRoleSchema;
