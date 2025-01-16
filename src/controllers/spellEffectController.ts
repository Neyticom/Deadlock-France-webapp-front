import type { Request, Response, NextFunction } from "express";
import SpellEffect from "../models/SpellEffect";

const spellEffectController = {
	getAllSpellEffects: async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			const { id: spellId } = req.params;
			const spellEffects = await SpellEffect.findAll({
				where: { spell_id: spellId },
			});

			res.status(200).json(spellEffects);
		} catch (error) {
			next(error);
		}
	},

	getSpellEffectById: async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			const { id: spellId, id: effectId } = req.params;
			const spellEffect = await SpellEffect.findOne({
				where: { id: effectId, spell_id: spellId },
			});

			if (!spellEffect) {
				res.status(404).json({ error: "Spell effect not found" });
				return;
			}

			res.status(200).json(spellEffect);
		} catch (error) {
			next(error);
		}
	},

	createSpellEffect: async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			const { id: spellId } = req.params;
			const { order, effect } = req.body;

			if (!order || !effect) {
				res
					.status(400)
					.json({ error: "Missing required fields: order, effect" });
				return;
			}

			const newSpellEffect = await SpellEffect.create({
				spell_id: spellId,
				order,
				effect,
			});

			res.status(201).json(newSpellEffect);
		} catch (error) {
			next(error);
		}
	},

	updateSpellEffect: async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			const { id: spellId, id: effectId } = req.params;
			const spellEffect = await SpellEffect.findOne({
				where: { id: effectId, spell_id: spellId },
			});

			if (!spellEffect) {
				res.status(404).json({ error: "Spell effect not found" });
				return;
			}

			const updatedSpellEffect = await spellEffect.update(req.body, {
				fields: Object.keys(req.body),
			});
			res.status(200).json(updatedSpellEffect);
		} catch (error) {
			next(error);
		}
	},

	deleteSpellEffect: async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			const { id: spellId, id: effectId } = req.params;
			const spellEffect = await SpellEffect.findOne({
				where: { id: effectId, spell_id: spellId },
			});

			if (!spellEffect) {
				res.status(404).json({ error: "Spell effect not found" });
				return;
			}

			await spellEffect.destroy();
			res.status(200).json({ message: "Spell effect deleted" });
		} catch (error) {
			next(error);
		}
	},
};

export default spellEffectController;
