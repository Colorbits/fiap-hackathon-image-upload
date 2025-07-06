import prisma from '../client';
import { ImageDto } from '../shared/models/Image';
import crypto from 'crypto';

export const createImageService = async (imageDto: ImageDto) => {

  const uuid = crypto.randomUUID();
  return prisma.image.create({
    data: {
      uuid,
      videoZipUuid: imageDto.videoZipUuid,
      filename: imageDto.filename,
      path: imageDto.path,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
};

export const getImage = async (imageUuid: string) => {
  return prisma.image.findFirst({
    where: {
      uuid: imageUuid,
    },
  });
};

export const getImageByVideoUuid = async (videoZipUuid: string) => {
  return prisma.image.findFirst({
    where: {
      videoZipUuid,
    },
  });
};

export default {
  getImageByVideoUuid,
  createImageService,
  getImage,
}