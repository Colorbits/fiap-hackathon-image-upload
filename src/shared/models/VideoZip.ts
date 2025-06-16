import { Image } from './Image';

export interface VideoZipDto {
  videoUuid: string;
  path: string;
  status: string;
}

export class VideoZip {
  videoUuid: string;
  path: string;
  status: string;
  images: Image[];
  constructor(videoZipDto: VideoZipDto) {
    this.videoUuid = videoZipDto.videoUuid;
    this.path = videoZipDto.path;
    this.status = videoZipDto.status;
    this.images = [];
  }
}
