import express, { NextFunction, Request, Response } from 'express';
import { config } from "dotenv";
import routes from './routes';
import cors from 'cors'

config();
const app = express();

// Log de requisições para debug
app.use((req: Request, _res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  console.log('Headers:', req.headers);
  next();
});

// Configuração do CORS - importante que seja aplicada ANTES das rotas
const corsOptions = {
  origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    // Lista de origens permitidas
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:5173',
      'http://127.0.0.1:5173',
      'http://localhost:4173', // Vite preview
      undefined // Permitir requisições sem Origin header (ex: mobile apps, Postman)
    ];
    
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log(`CORS bloqueado para origem: ${origin}`);
      callback(new Error('Origem não permitida pelo CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With'],
  credentials: true,
  optionsSuccessStatus: 204,
  maxAge: 86400 // Cache preflight por 24 horas
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Para suporte a form-data

// Responder a requisições OPTIONS (preflight) - embora o cors() já cuide disso
app.options('*', (req: Request, res: Response) => {
  console.log(`Preflight OPTIONS request para: ${req.path}`);
  res.sendStatus(204);
});

// Rotas da aplicação
app.use(routes);

// Rota para verificar se a API está online
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'image-upload-service'
  });
});

// Middleware para rotas não encontradas
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    status: false,
    message: 'Endpoint não encontrado'
  });
});

// Middleware de tratamento de erros
app.use((error: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Erro na aplicação:', error);
  
  const statusCode = error.status || 500;
  res.status(statusCode).json({
    status: false,
    message: error.message || "Um erro inesperado ocorreu",
    error: process.env.NODE_ENV === 'production' ? undefined : error,
  });
});

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'test') {
  const server = app.listen(PORT, () => {
    console.log(`
======================================
🚀 Servidor rodando na porta ${PORT}
📝 CORS habilitado para localhost
📅 ${new Date().toLocaleString()}
======================================
    `);
  });

  // Gerenciar encerramento do servidor
  process.on('SIGTERM', () => {
    console.log('SIGTERM recebido, encerrando servidor graciosamente');
    server.close(() => {
      console.log('Servidor encerrado');
      process.exit(0);
    });
  });
}

export default app;