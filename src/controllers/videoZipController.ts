import { Request, Response } from 'express';
import videoZipService from '../services/videoZipService';
import fs from 'fs';
import AdmZip from 'adm-zip';
import { videoZipStatusEnum } from '../shared/models/VideoZip';

export const createVideoZip = async (req: Request, res: Response) => {
  try {
    console.log(`createVideoZip ${JSON.stringify(req.body)}`);

    const { videoUuid } = req.body;
    const videoZip = await videoZipService.createVideoZip({
      videoUuid,
      status: videoZipStatusEnum.PROCESSING
    });
    res.status(201).json(videoZip);
  } catch (error) {
    console.error('Error creating video zip:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    res.status(500).json({ error: `Erro ao criar arquivo zip do vídeo: ${errorMessage}` });
  }
};

export const updateVideoZip = async (req: Request, res: Response) => {
  try {
    const { status, videoUuid } = req.body;

    const videoZip = await videoZipService.getVideoZip(videoUuid);

    if (!videoZip) {
      return res.status(404).json({ error: 'Arquivo zip do vídeo não encontrado' });
    }
    const updatedVideoZip = await videoZipService.updateVideoZip({
      uuid: videoZip.uuid,
      videoUuid: videoZip.videoUuid,
      status,
    });

    res.status(200).json(updatedVideoZip);
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
    const videoZip = await videoZipService.getVideoZip(videoUuid);

    if (!videoZip) {
      return res.status(404).json({ error: 'Arquivo zip do vídeo não encontrado' });
    }

    const images = await videoZipService.getImagesByVideoUuid(videoZip?.uuid);

    res.status(200).json(images);
  } catch (error) {
    console.error('Error fetching images by video UUID:', error);
    res.status(500).json({ error: 'Erro ao buscar imagens do vídeo' });
  }
};

export const getZippedImagesByVideoUuid = async (req: Request, res: Response) => {
  try {
    const { videoUuid } = req.params;
    const videoZip = await videoZipService.getVideoZip(videoUuid);

    if (!videoZip) {
      return res.status(404).json({ error: 'Arquivo zip do vídeo não encontrado' });
    }

    const images = await videoZipService.getImagesByVideoUuid(videoZip?.uuid);

    if (!images || images.length === 0) {
      return res.status(404).json({ error: 'Nenhuma imagem encontrada para este vídeo' });
    }

    const zip = new AdmZip();
    
    console.log(`Processando ${images.length} imagens para o arquivo zip`);
    for (const image of images) {
      try {
        if (fs.existsSync(image.path)) {
          console.log(`Adicionando imagem ao zip: ${image.filename} (${image.path})`);
          const fileContent = fs.readFileSync(image.path);
          zip.addFile(image.filename, fileContent);
        } else {
          console.warn(`Imagem não encontrada no sistema de arquivos: ${image.path}`);
        }
      } catch (fileError) {
        console.error(`Erro ao adicionar arquivo ao zip: ${image.path}`, fileError);
      }
    }
    console.log("Todas as imagens foram processadas");
    
    console.log("Gerando buffer do arquivo zip...");
    const zipBuffer = zip.toBuffer();
    console.log(`Buffer zip gerado com sucesso. Tamanho: ${zipBuffer.length} bytes`);
    
    const filename = `video_${videoUuid}_images.zip`;
    console.log(`Configurando download para arquivo: ${filename}`);
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Length', zipBuffer.length);
    
    res.status(200).send(zipBuffer);
  } catch (error) {
    console.error('Error creating zip file:', error);
    res.status(500).json({ error: 'Erro ao criar arquivo zip com as imagens do vídeo' });
  }
};