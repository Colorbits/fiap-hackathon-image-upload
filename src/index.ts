import express, { NextFunction, Request, Response } from 'express';
import { config } from "dotenv";
import routes from './routes';
import cors from 'cors'

config();
const app = express();
app.use(express.json());
app.use(routes);
app.use(cors())

app.use((error: any, _req: Request, res: Response, _next: NextFunction) => {
  const statusCode = error.status || 500;
  res.status(statusCode).json({
    status: false,
    message: error.message || "An unexpected error occurred",
    error,
  });
});

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}

export default app;