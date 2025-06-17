import { Router } from 'express';
import imageRoutes from './ImageRoutes'
import videoZipRoutes from './videoZipRoutes'

const indexRoute = Router();

indexRoute.get("", async (req, res) => {
  res.json({ message: "FIAP Hackathon Image Upload Service" });
});

indexRoute.use("/images", imageRoutes);
indexRoute.use("/video-zip", videoZipRoutes);

export default indexRoute;
