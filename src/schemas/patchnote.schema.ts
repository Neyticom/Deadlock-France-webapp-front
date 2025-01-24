import Joi from "joi";

const patchnoteSchema = {
	createPatchnote: Joi.object({
		version: Joi.string().max(20).required().messages({
			"any.required": "La version est requise.",
			"string.max": "La version ne peut pas dépasser 20 caractères.",
		}),
		title: Joi.string().max(96).required().messages({
			"any.required": "Le titre est requis.",
			"string.max": "Le titre ne peut pas dépasser 96 caractères.",
		}),
		date: Joi.date().required().messages({
			"any.required": "La date est requise.",
			"date.base": "La date doit être une date valide.",
		}),
		author: Joi.string().max(64).required().messages({
			"any.required": "L'auteur est requis.",
			"string.max": "L'auteur ne peut pas dépasser 64 caractères.",
		}),
		content: Joi.string().required().messages({
			"any.required": "Le contenu est requis.",
		}),
		state: Joi.string()
			.valid("DRAFT", "PUBLISHED", "ARCHIVED")
			.required()
			.messages({
				"any.required": "L'état est requis.",
				"any.only": "L'état doit être DRAFT, PUBLISHED ou ARCHIVED.",
			}),
	}),

	updatePatchnote: Joi.object({
		version: Joi.string().max(20).messages({
			"string.max": "La version ne peut pas dépasser 20 caractères.",
		}),
		title: Joi.string().max(96).messages({
			"string.max": "Le titre ne peut pas dépasser 96 caractères.",
		}),
		date: Joi.date().messages({
			"date.base": "La date doit être une date valide.",
		}),
		author: Joi.string().max(64).messages({
			"string.max": "L'auteur ne peut pas dépasser 64 caractères.",
		}),
		content: Joi.string(),
		state: Joi.string().valid("DRAFT", "PUBLISHED", "ARCHIVED").messages({
			"any.only": "L'état doit être DRAFT, PUBLISHED ou ARCHIVED.",
		}),
	}),

	replacePatchnote: Joi.object({
		version: Joi.string().max(20).required().messages({
			"any.required": "La version est requise.",
			"string.max": "La version ne peut pas dépasser 20 caractères.",
		}),
		title: Joi.string().max(96).required().messages({
			"any.required": "Le titre est requis.",
			"string.max": "Le titre ne peut pas dépasser 96 caractères.",
		}),
		date: Joi.date().required().messages({
			"any.required": "La date est requise.",
			"date.base": "La date doit être une date valide.",
		}),
		author: Joi.string().max(64).required().messages({
			"any.required": "L'auteur est requis.",
			"string.max": "L'auteur ne peut pas dépasser 64 caractères.",
		}),
		content: Joi.string().required().messages({
			"any.required": "Le contenu est requis.",
		}),
		state: Joi.string()
			.valid("DRAFT", "PUBLISHED", "ARCHIVED")
			.required()
			.messages({
				"any.required": "L'état est requis.",
				"any.only": "L'état doit être DRAFT, PUBLISHED ou ARCHIVED.",
			}),
	}),
};

export default patchnoteSchema;
