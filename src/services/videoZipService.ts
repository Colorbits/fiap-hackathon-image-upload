import prisma from '../client';
import { VideoZipDto } from '../shared/models/VideoZip';

export const createVideoZip = async (videoZipDto: VideoZipDto) => {
  return prisma.videoZip.create({
    data: {
      videoUuid: videoZipDto.videoUuid,
      path: videoZipDto.path,
      status: videoZipDto.status,
    },
  });
};

export const updateVideoZip = async (videoZipDto: VideoZipDto) => {
  return prisma.videoZip.update({
    where: {
      videoUuid: videoZipDto.videoUuid,
    },
    data: {
      path: videoZipDto.path,
      status: videoZipDto.status,
    },
  });
};

export const getVideoZip = async (videoUuid: string) => {
  return prisma.videoZip.findFirst({
    where: {
      videoUuid,
    },
  });
};

export const getImagesByVideoUuid = async (videoUuid: string) => {
  return prisma.image.findMany({
    where: {
      videoUuid,
    },
  });
};

export default {
  getImagesByVideoUuid,
  createVideoZip,
  updateVideoZip,
  getVideoZip,
}