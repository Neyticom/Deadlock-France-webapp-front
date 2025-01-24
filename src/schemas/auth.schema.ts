import Joi from "joi";

const authSchema = {
	login: Joi.object({
		login: Joi.string().min(3).max(32).required().messages({
			"string.min": "Le login doit contenir au moins {#limit} caractères.",
			"string.max": "Le login ne doit pas dépasser {#limit} caractères.",
			"any.required": "Le login est obligatoire.",
		}),
		password: Joi.string().min(8).max(96).required().messages({
			"string.min":
				"Le mot de passe doit contenir au moins {#limit} caractères.",
			"string.max": "Le mot de passe ne doit pas dépasser {#limit} caractères.",
			"any.required": "Le mot de passe est obligatoire.",
		}),
	}),
};

export default authSchema;
