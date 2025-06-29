import { Image } from './Image';

export enum videoZipStatusEnum {
  PROCESSING = 'PROCESSING',
  DONE = 'DONE',
  ERROR = 'ERROR',
}

export interface VideoZipDto {
  uuid?: string;
  videoUuid: string;
  status: videoZipStatusEnum;
  path?: string;
}

export class VideoZip {
  uuid?: string;
  videoUuid: string;
  status: videoZipStatusEnum;
  path?: string;
  images?: Image[];

  constructor(videoZipDto: VideoZipDto) {
    this.uuid = videoZipDto?.uuid;
    this.videoUuid = videoZipDto.videoUuid;
    this.path = videoZipDto.path;
    this.status = videoZipDto.status;
    this.images = [];
  }
}
