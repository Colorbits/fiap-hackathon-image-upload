import { Router } from 'express';
import imageRoutes from './ImageRoutes'
import videoZipRoutes from './videoZipRoutes'

const indexRoute = Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

indexRoute.get("", async (req, res) => {
  try {
    res.json({ message: "FIAP Hackathon Image Upload Service" });
  } catch (e) {
    console.error('Erro ao conectar ao banco de dados:', e);
  } finally {
    await prisma.$disconnect();
  }
});

indexRoute.get("/health", async (req, res) => {
  let dbStatus = "DOWN";
  let dbError = null;

  try {
    const startTime = Date.now();
    const dbResult = await prisma.$runCommandRaw({
      ping: 1,
    });
    const responseTime = Date.now() - startTime;

    if (dbResult) {
      dbStatus = "UP";
    }

    const healthInfo = {
      status: dbStatus === "UP" ? "UP" : "DOWN",
      services: {
        database: {
          status: dbStatus,
          responseTime: `${responseTime}ms`,
          error: dbError
        },
      },
    };

    if (healthInfo.status === "DOWN") {
      return res.status(503).json(healthInfo);
    }

    return res.status(200).json(healthInfo);
  } catch (e) {
    dbError = e instanceof Error ? e.message : "Erro desconhecido na conexão";

    return res.status(503).json({
      status: "DOWN",
      services: {
        database: {
          status: "DOWN",
          error: dbError
        }
      }
    });
  } finally {
    await prisma.$disconnect();
  }
});

indexRoute.use("/video-zip", videoZipRoutes);
indexRoute.use("/images", imageRoutes);

export default indexRoute;
