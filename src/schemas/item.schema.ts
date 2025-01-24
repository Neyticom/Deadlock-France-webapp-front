import Joi from "joi";

const itemSchema = {
	createItem: Joi.object({
		name: Joi.string().min(3).max(64).required().messages({
			"string.min": "Le nom doit contenir au moins {#limit} caractères.",
			"string.max": "Le nom ne doit pas dépasser {#limit} caractères.",
			"any.required": "Le nom de l'objet est obligatoire.",
		}),
		category: Joi.string()
			.valid("WEAPON", "VITALITY", "UTILITY", "MAGIC")
			.required()
			.messages({
				"any.only":
					"La catégorie doit être WEAPON, VITALITY, UTILITY ou MAGIC.",
				"any.required": "La catégorie est obligatoire.",
			}),
		cost: Joi.number().integer().min(0).required().messages({
			"number.integer": "Le coût doit être un entier.",
			"number.min": "Le coût doit être supérieur ou égal à {#limit}.",
			"any.required": "Le coût est obligatoire.",
		}),
		common_bonus: Joi.number().integer().min(0).messages({
			"number.integer": "Le bonus commun doit être un entier.",
			"number.min": "Le bonus commun doit être supérieur ou égal à {#limit}.",
		}),
		active_description: Joi.string().allow(null, "").max(255).messages({
			"string.max":
				"La description active ne doit pas dépasser {#limit} caractères.",
		}),
		active_duration: Joi.number().integer().min(0).messages({
			"number.integer": "La durée active doit être un entier.",
			"number.min": "La durée active doit être supérieure ou égale à {#limit}.",
		}),
		passive_description: Joi.string().allow(null, "").max(255).messages({
			"string.max":
				"La description passive ne doit pas dépasser {#limit} caractères.",
		}),
		passive_duration: Joi.number().integer().min(0).messages({
			"number.integer": "La durée passive doit être un entier.",
			"number.min":
				"La durée passive doit être supérieure ou égale à {#limit}.",
		}),
		parent_id: Joi.number().integer().allow(null),
	}),

	updateItem: Joi.object({
		name: Joi.string().min(3).max(64).messages({
			"string.min": "Le nom doit contenir au moins {#limit} caractères.",
			"string.max": "Le nom ne doit pas dépasser {#limit} caractères.",
		}),
		category: Joi.string()
			.valid("WEAPON", "VITALITY", "UTILITY", "MAGIC")
			.messages({
				"any.only":
					"La catégorie doit être WEAPON, VITALITY, UTILITY ou MAGIC.",
			}),
		cost: Joi.number().integer().min(0).messages({
			"number.integer": "Le coût doit être un entier.",
			"number.min": "Le coût doit être supérieur ou égal à {#limit}.",
		}),
		common_bonus: Joi.number().integer().min(0).messages({
			"number.integer": "Le bonus commun doit être un entier.",
			"number.min": "Le bonus commun doit être supérieur ou égal à {#limit}.",
		}),
		active_description: Joi.string().allow(null, "").max(255).messages({
			"string.max":
				"La description active ne doit pas dépasser {#limit} caractères.",
		}),
		active_duration: Joi.number().integer().min(0).messages({
			"number.integer": "La durée active doit être un entier.",
			"number.min": "La durée active doit être supérieure ou égale à {#limit}.",
		}),
		passive_description: Joi.string().allow(null, "").max(255).messages({
			"string.max":
				"La description passive ne doit pas dépasser {#limit} caractères.",
		}),
		passive_duration: Joi.number().integer().min(0).messages({
			"number.integer": "La durée passive doit être un entier.",
			"number.min":
				"La durée passive doit être supérieure ou égale à {#limit}.",
		}),
		parent_id: Joi.number().integer().allow(null),
	}),
};

export default itemSchema;
