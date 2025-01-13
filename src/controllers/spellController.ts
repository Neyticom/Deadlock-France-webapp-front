import type { Request, Response, NextFunction } from "express";
import Spell from "../models/Spell";

const spellController = {
  getAllSpells: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const spells = await Spell.findAll();
      res.status(200).json(spells);
    } catch (error) {
      next(error);
    }
  },

  getSpellById: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const spell = await Spell.findByPk(id);

      if (!spell) {
        res.status(404).json({ error: "Spell not found" });
        return;
      }

      res.status(200).json(spell);
    } catch (error) {
      next(error);
    }
  },

  createSpell: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { hero_id, name, order, description, passive, charge, cooldown } = req.body;

      // Validation des champs obligatoires
      if (!hero_id || !name || !order || !description || passive === undefined || charge === undefined || !cooldown) {
        res.status(400).json({ error: "Missing required fields: hero_id, name, order, description, passive, charge, cooldown" });
        return;
      }

      const newSpell = await Spell.create(req.body);
      res.status(201).json(newSpell);
    } catch (error) {
      next(error);
    }
  },

  updateSpell: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const spell = await Spell.findByPk(id);

      if (!spell) {
        res.status(404).json({ error: "Spell not found" });
        return;
      }

      // Mise à jour partielle des champs envoyés dans le body (PATCH)
      const updatedSpell = await spell.update(req.body, { fields: Object.keys(req.body) });
      res.status(200).json(updatedSpell);
    } catch (error) {
      next(error);
    }
  },

  deleteSpell: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const spell = await Spell.findByPk(id);

      if (!spell) {
        res.status(404).json({ error: "Spell not found" });
        return;
      }

      await spell.destroy();
      res.status(200).json({ message: "Spell deleted" });
    } catch (error) {
      next(error);
    }
  },
};

export default spellController;
