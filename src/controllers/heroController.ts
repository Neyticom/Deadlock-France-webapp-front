import type { Request, Response, NextFunction } from "express";
import Hero from "../models/Hero";

const heroController = {
  getAllHeroes: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const heroes = await Hero.findAll();
      res.status(200).json(heroes);
    } catch (error) {
      next(error);
    }
  },

  getHeroById: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const hero = await Hero.findByPk(id);

      if (!hero) {
        res.status(404).json({ error: "Hero not found" });
        return;
      }

      res.status(200).json(hero);
    } catch (error) {
      next(error);
    }
  },

  createHero: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { name, resume, description, img_path, video_path } = req.body;

      // Validation des champs obligatoires
      if (!name || !resume || !description) {
        res.status(400).json({ error: "Missing required fields: name, resume, description" });
        return;
      }

      const newHero = await Hero.create({ name, resume, description, img_path, video_path });
      res.status(201).json(newHero);
    } catch (error) {
      next(error);
    }
  },

  updateHero: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const hero = await Hero.findByPk(id);
  
      if (!hero) {
        res.status(404).json({ error: "Hero not found" });
        return;
      }
  
      // Avec PATCH, on met à jour uniquement les champs envoyés dans le body
      const updatedHero = await hero.update(req.body, { fields: Object.keys(req.body) });
      res.status(200).json(updatedHero);
    } catch (error) {
      next(error);
    }
  },

  deleteHero: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const hero = await Hero.findByPk(id);

      if (!hero) {
        res.status(404).json({ error: "Hero not found" });
        return;
      }

      await hero.destroy();
      res.status(200).json({ message: "Hero deleted" });
    } catch (error) {
      next(error);
    }
  },
};

export default heroController;
