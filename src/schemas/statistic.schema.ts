import Joi from "joi";

const statisticSchema = {
	upsertStatistic: Joi.object({
		origin: Joi.string().max(96).required().messages({
			"string.max": "L'origine ne peut pas dépasser {#limit} caractères.",
			"any.required": "L'origine est requise.",
		}),
		count: Joi.number().integer().min(0).required().messages({
			"number.integer": "Le compteur doit être un entier.",
			"number.min": "Le compteur ne peut pas être négatif.",
			"any.required": "Le compteur est requis.",
		}),
		date: Joi.date().iso().required().messages({
			"date.format": "La date doit être au format ISO.",
			"any.required": "La date est requise.",
		}),
		type: Joi.string().valid("VIEW", "CLICK").required().messages({
			"any.only": "Le type doit être soit 'VIEW' soit 'CLICK'.",
			"any.required": "Le type est requis.",
		}),
	}),
};

export default statisticSchema;
