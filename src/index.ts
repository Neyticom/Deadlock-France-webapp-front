import express from 'express';
import type { Request, Response } from 'express'; 
import router from './routes/router';
import database from './models/index';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
	res.send("Deadlock France API");
});

app.listen(PORT, () => {
	console.log(`🚀 Server is running on port ${PORT}`);
});