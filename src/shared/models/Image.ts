export interface ImageDto {
  uuid?: string;
  videoUuid: string;
  path: string;
  filename: string;
}

export class Image {
  uuid?: string;
  videoUuid: string;
  filename?: string;
  path: string;

  constructor(imageDto: ImageDto) {
    this.uuid = imageDto.uuid;
    this.videoUuid = imageDto.videoUuid;
    this.path = imageDto.path;
    this.filename = imageDto.filename;
  }
}