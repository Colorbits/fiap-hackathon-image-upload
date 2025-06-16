import { Request, Response } from 'express';
import * as imageService from '../services/imageService';
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

    if (!files.image?.length) return res.status(400).json({ error: 'Nenhum arquivo foi enviado.' });

    let oldPath = files.image[0]?.filepath;
    let rawData = fs.readFileSync(oldPath);
    const time = Math.floor(Date.now() / 1000);
    const filename = `${time}-${files.image[0]?.originalFilename}`;
    let filePath = path.join(__dirname, '../../uploads') + '/' + filename;

    fs.writeFile(filePath, rawData, async (err) => {
      if (err) console.log(err)
      const productImage = await imageService.createImageService({
        videoUuid,
        filename,
        path: filePath,
      });

      res.status(201).json(productImage);
    })
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar imagem' });
  }
};

export const getImageByVideoUuid = async (req: Request, res: Response) => {
  try {
    const { videoUuid } = req.params;
    const productImage = await imageService.getImageByVideoUuid(videoUuid);

    res.status(200).json(productImage);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar imagem' });
  }
};

export const getImage = async (req: Request, res: Response) => {
  try {
    const { uuid } = req.params;
    const image = await imageService.getImage(uuid);

    if (!image) {
      return res.status(404).json({ error: 'Imagem não encontrada' });
    }

    res.sendFile(image.path);
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erro ao buscar imagem' });
  }
};
