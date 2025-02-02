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
		author: Joi.string().max(64).messages({
			"string.max": "L'auteur ne peut pas dépasser 64 caractères.",
		}),
		content: Joi.string(),
		state: Joi.string()
			.valid("DRAFT", "PUBLISHED", "ARCHIVED")
			.required()
			.messages({
				"any.required": "L'état est requis.",
				"any.only": "L'état doit être DRAFT, PUBLISHED ou ARCHIVED.",
			}),
		img_path: Joi.string().max(128).required().messages({
			"any.required": "Le chemin de l'image est requis.",
			"string.max": "Le chemin de l'image ne peut pas dépasser 128 caractères.",
		}),
		video_path: Joi.string().max(128).messages({
			"string.max":
				"Le chemin de la vidéo ne peut pas dépasser 128 caractères.",
		}),
		source: Joi.string().uri().required().messages({
			"string.uri": "L'URL de la source doit être une URL valide.",
			"any.required": "L'URL de la source est requis.",
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
		img_path: Joi.string().max(128).messages({
			"string.max": "Le chemin de l'image ne peut pas dépasser 128 caractères.",
		}),
		video_path: Joi.string().max(128).messages({
			"string.max":
				"Le chemin de la vidéo ne peut pas dépasser 128 caractères.",
		}),
		source: Joi.string().uri().messages({
			"string.uri": "L'URL de la source doit être une URL valide.",
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
		author: Joi.string().max(64).messages({
			"string.max": "L'auteur ne peut pas dépasser 64 caractères.",
		}),
		content: Joi.string(),
		state: Joi.string()
			.valid("DRAFT", "PUBLISHED", "ARCHIVED")
			.required()
			.messages({
				"any.required": "L'état est requis.",
				"any.only": "L'état doit être DRAFT, PUBLISHED ou ARCHIVED.",
			}),
		img_path: Joi.string().max(128).required().messages({
			"any.required": "Le chemin de l'image est requis.",
			"string.max": "Le chemin de l'image ne peut pas dépasser 128 caractères.",
		}),
		video_path: Joi.string().max(128).messages({
			"string.max":
				"Le chemin de la vidéo ne peut pas dépasser 128 caractères.",
		}),
		source: Joi.string().uri().required().messages({
			"string.uri": "L'URL de la source doit être une URL valide.",
			"any.required": "L'URL de la source est requis.",
		}),
	}),
};

export default patchnoteSchema;
