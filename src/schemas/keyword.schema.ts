import Joi from "joi";

const keywordSchema = {
	createKeyword: Joi.object({
		ressource_type: Joi.string()
			.valid("HERO", "ITEM", "SPELL")
			.required()
			.messages({
				"any.only": 'Le type de ressource doit être "HERO", "ITEM" ou "SPELL".',
				"any.required": "Le type de ressource est obligatoire.",
			}),
		ressource_id: Joi.number().integer().required().messages({
			"any.required": "L'ID de la ressource est obligatoire.",
		}),
		value: Joi.string().max(64).required().messages({
			"string.max": "Le mot-clé ne doit pas dépasser {#limit} caractères.",
			"any.required": "Le mot-clé est obligatoire.",
		}),
	}),

	updateKeyword: Joi.object({
		ressource_type: Joi.string().valid("HERO", "ITEM", "SPELL").messages({
			"any.only": 'Le type de ressource doit être "HERO", "ITEM" ou "SPELL".',
		}),
		ressource_id: Joi.number().integer(),
		value: Joi.string().max(64).messages({
			"string.max": "Le mot-clé ne doit pas dépasser {#limit} caractères.",
		}),
	}),
};

export default keywordSchema;
