import type { Request, Response, NextFunction } from "express";
import type { Schema } from "joi";

const validationMiddleware = (schema: Schema) => {
	return async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			const { error } = schema.validate(req.body, { abortEarly: false });

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
