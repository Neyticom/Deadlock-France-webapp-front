import { Op } from 'sequelize';
import type { Request, Response, NextFunction } from 'express';
import Patchnote from '../models/Patchnote';

const patchnoteController = {
  getAllPatchnotes: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const patchnotes = await Patchnote.findAll();
      res.status(200).json(patchnotes);
    } catch (error) {
      next(error);
    }
  },

  getPatchnoteById: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const patchnote = await Patchnote.findByPk(id);

      if (!patchnote) {
        res.status(404).json({ error: "Patchnote not found" });
        return;
      }

      res.status(200).json(patchnote);
    } catch (error) {
      next(error);
    }
  },

  createPatchnote: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { version, title, date, author, content, state } = req.body;

      // Validation des champs obligatoires
      if (!version || !title || !date || !state) {
        res.status(400).json({ error: "Missing required fields: version, title, date, state" });
        return;
      }

      const newPatchnote = await Patchnote.create({ version, title, date, author, content, state });
      res.status(201).json(newPatchnote);
    } catch (error) {
      next(error);
    }
  },

  updatePatchnote: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const patchnote = await Patchnote.findByPk(id);

      if (!patchnote) {
        res.status(404).json({ error: "Patchnote not found" });
        return;
      }

      // Mise à jour partielle (PATCH)
      const updatedPatchnote = await patchnote.update(req.body, { fields: Object.keys(req.body) });
      res.status(200).json(updatedPatchnote);
    } catch (error) {
      next(error);
    }
  },

  replacePatchnote: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const patchnote = await Patchnote.findByPk(id);

      if (!patchnote) {
        res.status(404).json({ error: "Patchnote not found" });
        return;
      }

      // Remplacement complet (PUT)
      const replacedPatchnote = await patchnote.update(req.body);
      res.status(200).json(replacedPatchnote);
    } catch (error) {
      next(error);
    }
  },

  deletePatchnote: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const patchnote = await Patchnote.findByPk(id);

      if (!patchnote) {
        res.status(404).json({ error: "Patchnote not found" });
        return;
      }

      await patchnote.destroy();
      res.status(200).json({ message: "Patchnote deleted" });
    } catch (error) {
      next(error);
    }
  },

  searchPatchnotes: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { keywords } = req.query;

      if (!keywords || typeof keywords !== 'string') {
        res.status(400).json({ error: 'Veuillez fournir des mots-clés dans les paramètres de requête' });
        return;
      }

      const keywordList = keywords.split(',').map((keyword) => keyword.trim());

      const patchnotes = await Patchnote.findAll({
        where: {
          content: {
            [Op.iLike]: `%${keywordList.join('%')}%`, // Recherche insensible à la casse avec iLike
          },
        },
      });

      res.status(200).json(patchnotes);
    } catch (error) {
      next(error);
    }
  },
};

export default patchnoteController;
