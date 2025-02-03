import Joi from "joi";

const patchnoteEntrySchema = {
	createPatchnoteEntry: Joi.object({
		patchnote_id: Joi.number().integer().required().messages({
			"any.required": "L'ID du patchnote est requis.",
		}),
		category: Joi.string()
			.valid("BUFF", "NERF", "CHANGE", "FIX")
			.required()
			.messages({
				"any.required": "La catégorie est requise.",
				"any.only": "La catégorie doit être BUFF, NERF, CHANGE ou FIX.",
			}),
		ressource_type: Joi.string()
			.valid("HERO", "ITEM", "SPELL", "GLOBAL")
			.required()
			.messages({
				"any.required": "Le type de ressource est requis.",
				"any.only":
					"Le type de ressource doit être HERO, ITEM, SPELL ou GLOBAL.",
			}),
		ressource_id: Joi.number().integer().messages({
			"number.integer": "La position doit être un entier.",
		}),
		position: Joi.number().integer().required().messages({
			"number.integer": "La position doit être un entier.",
			"any.required": "La position est requise.",
		}),
		description: Joi.string().required().messages({
			"any.required": "La description est requise.",
		}),
	}),

	updatePatchnoteEntry: Joi.object({
		category: Joi.string().valid("BUFF", "NERF", "CHANGE", "FIX").messages({
			"any.only": "La catégorie doit être BUFF, NERF, CHANGE ou FIX.",
		}),
		ressource_type: Joi.string()
			.valid("HERO", "ITEM", "SPELL", "GLOBAL")
			.messages({
				"any.only":
					"Le type de ressource doit être HERO, ITEM, SPELL ou GLOBAL.",
			}),
		ressource_id: Joi.number().integer(),
		position: Joi.number().integer().messages({
			"number.integer": "La position doit être un entier.",
		}),
		description: Joi.string(),
	}),
};

export default patchnoteEntrySchema;
