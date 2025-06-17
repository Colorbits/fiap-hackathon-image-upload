import { Request, Response } from 'express';
import videoZipService from '../services/videoZipService';

export const createVideoZip = async (req: Request, res: Response) => {
  try {
    const { videoUuid } = req.body;
    const videoZip = await videoZipService.createVideoZip({
      videoUuid,
      status: 'PENDING',
    });
    res.status(201).json(videoZip);
  } catch (error) {
    console.error('Error creating video zip:', error);
    res.status(500).json({ error: 'Erro ao criar arquivo zip do vídeo' });
  }
};

export const updateVideoZip = async (req: Request, res: Response) => {
  try {
    const { videoUuid } = req.params;
    const { status } = req.body;
    const videoZip = await videoZipService.updateVideoZip({
      videoUuid,
      status,
    });

    res.status(200).json(videoZip);
  } catch (error) {
    console.error('Error updating video zip:', error);
    res.status(500).json({ error: 'Erro ao atualizar arquivo zip do vídeo' });
  }
};

export const getVideoZip = async (req: Request, res: Response) => {
  try {
    const { videoUuid } = req.params;
    const videoZip = await videoZipService.getVideoZip(videoUuid);

    if (!videoZip) {
      return res.status(404).json({ error: 'Arquivo zip do vídeo não encontrado' });
    }

    res.status(200).json(videoZip);
  } catch (error) {
    console.error('Error fetching video zip:', error);
    res.status(500).json({ error: 'Erro ao buscar arquivo zip do vídeo' });
  }
};

export const getImagesByVideoUuid = async (req: Request, res: Response) => {
  try {
    const { videoUuid } = req.params;
    const images = await videoZipService.getImagesByVideoUuid(videoUuid);

    res.status(200).json(images);
  } catch (error) {
    console.error('Error fetching images by video UUID:', error);
    res.status(500).json({ error: 'Erro ao buscar imagens do vídeo' });
  }
};