import { Router } from 'express';
import imageRoutes from './ImageRoutes'

const indexRoute = Router();

indexRoute.get("", async (req, res) => {
  res.json({ message: "FIAP Hackathon Image Upload Service" });
});

indexRoute.use("/images", imageRoutes);

export default indexRoute;
