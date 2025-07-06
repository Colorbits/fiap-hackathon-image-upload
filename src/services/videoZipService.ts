import prisma from '../client';
import { VideoZipDto } from '../shared/models/VideoZip';
import crypto from 'crypto';

export const createVideoZip = async (videoZipDto: VideoZipDto) => {
  const uuid = crypto.randomUUID();

  return prisma.videoZip.create({
    data: {
      uuid,
      status: videoZipDto.status,
      videoUuid: videoZipDto.videoUuid,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
};

export const updateVideoZip = async (videoZipDto: VideoZipDto) => {
  return prisma.videoZip.update({
    where: {
      uuid: videoZipDto.uuid,
    },
    data: {
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

export const getImagesByVideoUuid = async (videoZipUuid: string) => {

  return prisma.image.findMany({
    where: {
      videoZipUuid,
    },
  });
};

export default {
  getImagesByVideoUuid,
  createVideoZip,
  updateVideoZip,
  getVideoZip,
}