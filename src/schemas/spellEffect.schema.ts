import Joi from "joi";

const spellEffectSchema = {
	createSpellEffect: Joi.object({
		spell_id: Joi.number().integer().required().messages({
			"any.required": "L'ID du sort est obligatoire.",
		}),
		order: Joi.number().integer().required().messages({
			"number.integer": "L'ordre de l'effet doit être un entier.",
			"any.required": "L'ordre de l'effet est obligatoire.",
		}),
		effect: Joi.string().max(192).required().messages({
			"string.max": "L'effet ne doit pas dépasser {#limit} caractères.",
			"any.required": "La description de l'effet est obligatoire.",
		}),
	}),

	updateSpellEffect: Joi.object({
		spell_id: Joi.number().integer(),
		order: Joi.number().integer().messages({
			"number.integer": "L'ordre de l'effet doit être un entier.",
		}),
		effect: Joi.string().max(192).messages({
			"string.max": "L'effet ne doit pas dépasser {#limit} caractères.",
		}),
	}),
};

export default spellEffectSchema;
