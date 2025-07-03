import { Request, Response } from 'express';
import * as imageService from '../services/imageService';
import * as videoZipService from '../services/videoZipService';
import formidable from 'formidable';
import path from 'path';
import fs from 'fs';

export const createImage = async (req: Request, res: Response) => {
  try {
    const { videoUuid } = req.params;
    const form = formidable({});
    let fields;
    let files: formidable.Files;
    try {
      [fields, files] = await form.parse(req);
    } catch (err) {
      console.log('Error parsing form:', (err as Error).message);
      throw err;
    }

    if (!files.file?.length) return res.status(400).json({ error: 'Nenhum arquivo foi enviado.' });

    let oldPath = files.file[0]?.filepath;
    let rawData = fs.readFileSync(oldPath);
    const time = Math.floor(Date.now() / 1000);
    const filename = `${time}-${files.file[0]?.originalFilename}`;
    let filePath = path.join(__dirname, '../../uploads') + '/' + filename;

    const videoZip = await videoZipService.getVideoZip(videoUuid);

    if (!videoZip?.uuid) {
      return res.status(404).json({ error: 'Vídeo não encontrado.' });
    }

    fs.writeFile(filePath, rawData, async (err) => {
      if (err) console.log(err)
      const image = await imageService.createImageService({
        videoZipUuid: videoZip?.uuid,
        filename,
        path: filePath,
      });

      res.status(201).json(image);
    })
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar imagem' });
  }
};

export const getImageByVideoUuid = async (req: Request, res: Response) => {
  try {
    const { videoUuid } = req.params;
    const image = await imageService.getImageByVideoUuid(videoUuid);

    res.status(200).json(image);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar imagem' });
  }
};

export const getImage = async (req: Request, res: Response) => {
  try {
    const { imageUuid } = req.params;
    const image = await imageService.getImage(imageUuid);

    if (!image) {
      return res.status(404).json({ error: 'Imagem não encontrada' });
    }

    res.sendFile(image.path);
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erro ao buscar imagem' });
  }
};
