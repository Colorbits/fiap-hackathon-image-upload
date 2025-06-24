import { Router } from 'express';
import imageRoutes from './ImageRoutes'
import videoZipRoutes from './videoZipRoutes'

const indexRoute = Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

indexRoute.get("", async (req, res) => {
  try {
    // Tenta uma operação simples
    const result = await prisma.$runCommandRaw({
      ping: 1,
    });
    console.log('Conexão com banco de dados bem-sucedida!', result);
    res.json({ message: "FIAP Hackathon Image Upload Service", result });
    return result
  } catch (e) {
    console.error('Erro ao conectar ao banco de dados:', e);
  } finally {
    await prisma.$disconnect();
  }
});

indexRoute.use("/video-zip", videoZipRoutes);
indexRoute.use("/images", imageRoutes);

export default indexRoute;
