import { Image } from './Image';

export interface VideoZipDto {
  videoUuid: string;
  status: string;
  path?: string;
}

export class VideoZip {
  videoUuid: string;
  status: string;
  path?: string;
  images?: Image[];
  constructor(videoZipDto: VideoZipDto) {
    this.videoUuid = videoZipDto.videoUuid;
    this.path = videoZipDto.path;
    this.status = videoZipDto.status;
    this.images = [];
  }
}
