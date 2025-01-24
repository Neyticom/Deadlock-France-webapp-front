import Joi from "joi";

const itemEffectSchema = {
	createItemEffect: Joi.object({
		item_id: Joi.number().integer().required().messages({
			"any.required": "L'ID de l'objet est obligatoire.",
		}),
		type: Joi.string()
			.valid("COMMON", "ACTIVE", "PASSIVE")
			.required()
			.messages({
				"any.only": "Le type doit être COMMON, ACTIVE ou PASSIVE.",
				"any.required": "Le type d’effet est obligatoire.",
			}),
		effect: Joi.string().max(192).required().messages({
			"string.max": "L'effet ne doit pas dépasser {#limit} caractères.",
			"any.required": "La description de l'effet est obligatoire.",
		}),
	}),

	updateItemEffect: Joi.object({
		type: Joi.string().valid("COMMON", "ACTIVE", "PASSIVE").messages({
			"any.only": "Le type doit être COMMON, ACTIVE ou PASSIVE.",
		}),
		effect: Joi.string().max(192).messages({
			"string.max": "L'effet ne doit pas dépasser {#limit} caractères.",
		}),
	}),
};

export default itemEffectSchema;
