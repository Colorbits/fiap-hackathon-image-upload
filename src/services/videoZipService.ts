import prisma from '../client';
import { VideoZipDto } from '../shared/models/VideoZip';

export const createVideoZip = async (videoZipDto: VideoZipDto) => {
  return prisma.videoZip.create({
    data: {
      videoUuid: videoZipDto.videoUuid,
      status: videoZipDto.status
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