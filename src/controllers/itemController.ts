import type { Request, Response, NextFunction } from 'express';
import Item from '../models/Item';

const itemController = {
  getAllItems: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const items = await Item.findAll();
      res.status(200).json(items);
    } catch (error) {
      next(error);
    }
  },

  getItemById: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const item = await Item.findByPk(id);

      if (!item) {
        res.status(404).json({ error: 'Item not found' });
        return;
      }

      res.status(200).json(item);
    } catch (error) {
      next(error);
    }
  },

  createItem: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { name, description, price } = req.body;

      if (!name || !description || price == null) {
        res.status(400).json({ error: 'Missing required fields: name, description, price' });
        return;
      }

      const newItem = await Item.create({ name, description, price });
      res.status(201).json(newItem);
    } catch (error) {
      next(error);
    }
  },

  updateItem: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const item = await Item.findByPk(id);

      if (!item) {
        res.status(404).json({ error: 'Item not found' });
        return;
      }

      // Partial update using PATCH
      const updatedItem = await item.update(req.body, { fields: Object.keys(req.body) });
      res.status(200).json(updatedItem);
    } catch (error) {
      next(error);
    }
  },

  deleteItem: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const item = await Item.findByPk(id);

      if (!item) {
        res.status(404).json({ error: 'Item not found' });
        return;
      }

      await item.destroy();
      res.status(200).json({ message: 'Item deleted' });
    } catch (error) {
      next(error);
    }
  },
};

export default itemController;
