import prisma from '../client';
import { ImageDto } from '../shared/models/Image';

export const createImageService = async (imageDto: ImageDto) => {
  return prisma.image.create({
    data: {
      videoUuid: imageDto.videoUuid,
      filename: imageDto.filename,
      path: imageDto.path,
    },
  });
};

export const getImage = async (uuid: string) => {
  return prisma.image.findFirst({
    where: {
      uuid,
    },
  });
};

export const getImageByVideoUuid = async (videoUuid: string) => {
  return prisma.image.findFirst({
    where: {
      videoUuid,
    },
  });
};

export default {
  getImageByVideoUuid,
  createImageService,
  getImage,
}