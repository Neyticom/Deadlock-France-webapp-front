/**
 * Middleware de validation des données.
 * Vérifie que les données envoyées respectent le schéma défini avec Joi.
 */

import type { Request, Response, NextFunction } from "express";
import type { Schema } from "joi";

/**
 * Middleware générique de validation.
 * @param schema - Schéma Joi utilisé pour valider les données.
 * @returns Middleware Express exécutant la validation.
 */
const validationMiddleware = (schema: Schema) => {
	return async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			const { error } = schema.validate(req.body, { abortEarly: false });

			// Vérification des erreurs de validation.
			if (error) {
				const errorMessages = error.details.map((detail) => detail.message);
				res.status(400).json({ errors: errorMessages });
				return;
			}

			next();
		} catch (err) {
			next(err);
		}
	};
};

export default validationMiddleware;
