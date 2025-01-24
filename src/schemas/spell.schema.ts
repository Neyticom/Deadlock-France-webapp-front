import Joi from "joi";

const spellSchema = {
	createSpell: Joi.object({
		hero_id: Joi.number().integer().required().messages({
			"any.required": "L'ID du héros est obligatoire.",
		}),
		name: Joi.string().max(64).required().messages({
			"string.max": "Le nom du sort ne doit pas dépasser {#limit} caractères.",
			"any.required": "Le nom du sort est obligatoire.",
		}),
		order: Joi.number().integer().required().messages({
			"number.integer": "L'ordre du sort doit être un entier.",
			"any.required": "L'ordre du sort est obligatoire.",
		}),
		description: Joi.string().required().messages({
			"any.required": "La description du sort est obligatoire.",
		}),
		passive: Joi.boolean().required().messages({
			"any.required": 'Le champ "passive" est obligatoire.',
		}),
		charge: Joi.boolean().required().messages({
			"any.required": 'Le champ "charge" est obligatoire.',
		}),
		charge_count: Joi.number().integer().min(0).messages({
			"number.integer": "Le nombre de charges doit être un entier.",
			"number.min": "Le nombre de charges ne peut pas être négatif.",
		}),
		charge_time: Joi.number().integer().min(0).messages({
			"number.integer": "Le temps de charge doit être un entier.",
			"number.min": "Le temps de charge ne peut pas être négatif.",
		}),
		charge_interval: Joi.number().integer().min(0).messages({
			"number.integer": "L'intervalle de charge doit être un entier.",
			"number.min": "L'intervalle de charge ne peut pas être négatif.",
		}),
		cooldown: Joi.number().integer().required().messages({
			"number.integer": "Le cooldown doit être un entier.",
			"any.required": "Le cooldown est obligatoire.",
		}),
		distance: Joi.string().max(96).messages({
			"string.max": "La distance ne doit pas dépasser {#limit} caractères.",
		}),
		first_upgrade: Joi.string().max(192).messages({
			"string.max":
				"Le premier upgrade ne doit pas dépasser {#limit} caractères.",
		}),
		second_upgrade: Joi.string().max(192).messages({
			"string.max":
				"Le second upgrade ne doit pas dépasser {#limit} caractères.",
		}),
		third_upgrade: Joi.string().max(192).messages({
			"string.max":
				"Le troisième upgrade ne doit pas dépasser {#limit} caractères.",
		}),
		icon_path: Joi.string().max(128).messages({
			"string.max":
				"Le chemin de l'icône ne doit pas dépasser {#limit} caractères.",
		}),
		demo_path: Joi.string().max(128).messages({
			"string.max":
				"Le chemin de la démonstration ne doit pas dépasser {#limit} caractères.",
		}),
	}),

	updateSpell: Joi.object({
		hero_id: Joi.number().integer(),
		name: Joi.string().max(64).messages({
			"string.max": "Le nom du sort ne doit pas dépasser {#limit} caractères.",
		}),
		order: Joi.number().integer().messages({
			"number.integer": "L'ordre du sort doit être un entier.",
		}),
		description: Joi.string(),
		passive: Joi.boolean(),
		charge: Joi.boolean(),
		charge_count: Joi.number().integer().min(0).messages({
			"number.integer": "Le nombre de charges doit être un entier.",
			"number.min": "Le nombre de charges ne peut pas être négatif.",
		}),
		charge_time: Joi.number().integer().min(0).messages({
			"number.integer": "Le temps de charge doit être un entier.",
			"number.min": "Le temps de charge ne peut pas être négatif.",
		}),
		charge_interval: Joi.number().integer().min(0).messages({
			"number.integer": "L'intervalle de charge doit être un entier.",
			"number.min": "L'intervalle de charge ne peut pas être négatif.",
		}),
		cooldown: Joi.number().integer().messages({
			"number.integer": "Le cooldown doit être un entier.",
		}),
		distance: Joi.string().max(96).messages({
			"string.max": "La distance ne doit pas dépasser {#limit} caractères.",
		}),
		first_upgrade: Joi.string().max(192).messages({
			"string.max":
				"Le premier upgrade ne doit pas dépasser {#limit} caractères.",
		}),
		second_upgrade: Joi.string().max(192).messages({
			"string.max":
				"Le second upgrade ne doit pas dépasser {#limit} caractères.",
		}),
		third_upgrade: Joi.string().max(192).messages({
			"string.max":
				"Le troisième upgrade ne doit pas dépasser {#limit} caractères.",
		}),
		icon_path: Joi.string().max(128).messages({
			"string.max":
				"Le chemin de l'icône ne doit pas dépasser {#limit} caractères.",
		}),
		demo_path: Joi.string().max(128).messages({
			"string.max":
				"Le chemin de la démonstration ne doit pas dépasser {#limit} caractères.",
		}),
	}),
};

export default spellSchema;
