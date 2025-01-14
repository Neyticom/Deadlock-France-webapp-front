import type { Request, Response, NextFunction } from 'express';
import Keyword from '../models/Keyword';

const keywordController = {
  getAllKeywords: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const keywords = await Keyword.findAll();
      res.status(200).json(keywords);
    } catch (error) {
      next(error);
    }
  },

  getKeywordById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const keyword = await Keyword.findByPk(id);

      if (!keyword) {
        res.status(404).json({ error: "Keyword not found" });
        return;
      }

      res.status(200).json(keyword);
    } catch (error) {
      next(error);
    }
  },

  createKeyword: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { ressource_type, ressource_id, value } = req.body;

      if (!ressource_type || !ressource_id || !value) {
        res.status(400).json({ error: "Missing required fields: ressource_type, ressource_id, value" });
        return;
      }

      const newKeyword = await Keyword.create({ ressource_type, ressource_id, value });
      res.status(201).json(newKeyword);
    } catch (error) {
      next(error);
    }
  },

  updateKeyword: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const keyword = await Keyword.findByPk(id);

      if (!keyword) {
        res.status(404).json({ error: "Keyword not found" });
        return;
      }

      const updatedKeyword = await keyword.update(req.body, { fields: Object.keys(req.body) });
      res.status(200).json(updatedKeyword);
    } catch (error) {
      next(error);
    }
  },

  deleteKeyword: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const keyword = await Keyword.findByPk(id);

      if (!keyword) {
        res.status(404).json({ error: "Keyword not found" });
        return;
      }

      await keyword.destroy();
      res.status(200).json({ message: "Keyword deleted" }); 
    } catch (error) {
      next(error);
    }
  },
};

export default keywordController;