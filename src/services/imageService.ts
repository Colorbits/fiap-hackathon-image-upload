import prisma from '../client';
import { ImageDto } from '../shared/models/Image';

export const createImageService = async (imageDto: ImageDto) => {
  return prisma.image.create({
    data: {
      videoZipUuid: imageDto.videoZipUuid,
      filename: imageDto.filename,
      path: imageDto.path,
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