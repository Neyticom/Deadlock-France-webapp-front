/**
 * Middleware de gestion des erreurs globales.
 * Capture toutes les erreurs non gérées et renvoie une réponse standardisée.
 */

import type { Request, Response, NextFunction } from "express";

const errorHandler = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	console.error(err.stack);

	// Réponse standardisée pour les erreurs serveur.
	res.status(500).json({ error: "Internal Server Error" });
};

export default errorHandler;
