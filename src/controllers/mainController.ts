/**
 * Contrôleur principal.
 * Fournit des informations sur l'état de l'API.
 */

import type { Request, Response } from "express";

/**
 * Renvoie le statut de l'API.
 * @param req - Requête Express.
 * @param res - Réponse Express contenant le statut.
 */
const getStatus = (req: Request, res: Response) => {
	res.json({ status: "L'API est en cours d'exécution." });
};

export default { getStatus };
