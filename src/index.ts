import express from 'express';
import type { Request, Response } from 'express';
import router from './routes/router';
import sequelize from './config/database';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Deadlock France API');
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Database connected...');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
