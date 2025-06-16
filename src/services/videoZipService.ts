import prisma from '../client';
import { ImageDto } from '../shared/models/Image';
import { VideoZipDto } from '../shared/models/VideoZip';

export const createVideoZip = async (videoZipDto: VideoZipDto) => {
  return prisma.image.create({
    data: {
      videoUuid: videoZipDto.videoUuid,
      path: videoZipDto.path,
      status: videoZipDto.status,
    },
  });
};

export const updateVideoZip = async (videoZipDto: VideoZipDto) => {
  return prisma.image.update({
    where: {
      videoUuid: videoZipDto.videoUuid,
    },
    data: {
      path: videoZipDto.path,
      status: videoZipDto.status,
    },
  });
};

export const getVideoZip = async (uuid: string) => {
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
  createVideoZip,
  updateVideoZip,
  getVideoZip,
}