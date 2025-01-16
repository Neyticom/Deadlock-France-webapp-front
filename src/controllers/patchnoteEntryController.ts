import type { Request, Response, NextFunction } from 'express';
import PatchnoteEntry from '../models/PatchnoteEntry';

const patchnoteEntryController = {
  getAllEntries: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id: patchnoteId } = req.params;
      const entries = await PatchnoteEntry.findAll({ where: { patchnote_id: patchnoteId } });
      res.status(200).json(entries);
    } catch (error) {
      next(error);
    }
  },

  getEntryById: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id: patchnoteId, id: entryId } = req.params;
      const entry = await PatchnoteEntry.findOne({ where: { id: entryId, patchnote_id: patchnoteId } });

      if (!entry) {
        res.status(404).json({ error: "Patchnote entry not found" });
        return;
      }

      res.status(200).json(entry);
    } catch (error) {
      next(error);
    }
  },

  createEntry: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id: patchnoteId } = req.params;
      const newEntry = await PatchnoteEntry.create({ ...req.body, patchnote_id: patchnoteId });
      res.status(201).json(newEntry);
    } catch (error) {
      next(error);
    }
  },

  updateEntry: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id: patchnoteId, id: entryId } = req.params;
      const entry = await PatchnoteEntry.findOne({ where: { id: entryId, patchnote_id: patchnoteId } });

      if (!entry) {
        res.status(404).json({ error: "Patchnote entry not found" });
        return;
      }

      const updatedEntry = await entry.update(req.body, { fields: Object.keys(req.body) });
      res.status(200).json(updatedEntry);
    } catch (error) {
      next(error);
    }
  },

  deleteEntry: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id: patchnoteId, id: entryId } = req.params;
      const entry = await PatchnoteEntry.findOne({ where: { id: entryId, patchnote_id: patchnoteId } });

      if (!entry) {
        res.status(404).json({ error: "Patchnote entry not found" });
        return;
      }

      await entry.destroy();
      res.status(200).json({ message: "Patchnote entry deleted" });
    } catch (error) {
      next(error);
    }
  },
};

export default patchnoteEntryController;
