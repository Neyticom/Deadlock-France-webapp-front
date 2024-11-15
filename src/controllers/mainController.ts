import type { Request, Response } from 'express';

const getStatus = (req: Request, res: Response) => {
  res.json({ status: 'API is running' });
};

export default { getStatus };
