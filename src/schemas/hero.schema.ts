import Joi from "joi";

const heroSchema = {
	createHero: Joi.object({
		name: Joi.string().min(3).max(64).required().messages({
			"string.min": "Le nom doit contenir au moins {#limit} caractères.",
			"string.max": "Le nom ne doit pas dépasser {#limit} caractères.",
			"any.required": "Le nom du héros est obligatoire.",
		}),
		resume: Joi.string().max(255).required().messages({
			"string.max": "Le résumé ne doit pas dépasser {#limit} caractères.",
			"any.required": "Le résumé est obligatoire.",
		}),
		description: Joi.string().required().messages({
			"any.required": "La description est obligatoire.",
		}),
		img_path: Joi.string().uri().required().messages({
			"string.uri": "L'URL de l'image doit être une URL valide.",
			"any.required": "L'URL de l'image est obligatoire.",
		}),
		video_path: Joi.string().uri().required().messages({
			"string.uri": "L'URL de la vidéo doit être une URL valide.",
			"any.required": "L'URL de la vidéo est obligatoire.",
		}),
	}),

	updateHero: Joi.object({
		name: Joi.string().min(3).max(64).messages({
			"string.min": "Le nom doit contenir au moins {#limit} caractères.",
			"string.max": "Le nom ne doit pas dépasser {#limit} caractères.",
		}),
		resume: Joi.string().max(255).messages({
			"string.max": "Le résumé ne doit pas dépasser {#limit} caractères.",
		}),
		description: Joi.string(),
		img_path: Joi.string().uri().messages({
			"string.uri": "L'URL de l'image doit être une URL valide.",
		}),
		video_path: Joi.string().uri().messages({
			"string.uri": "L'URL de la vidéo doit être une URL valide.",
		}),
	}),
};

export default heroSchema;
