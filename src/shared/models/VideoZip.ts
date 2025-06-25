import { Image } from './Image';

export interface VideoZipDto {
  uuid?: string;
  videoUuid: string;
  status: string;
  path?: string;
}

export class VideoZip {
  uuid?: string;
  videoUuid: string;
  status: string;
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
