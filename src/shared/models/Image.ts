export interface ImageDto {
  uuid?: string;
  videoZipUuid: string;
  path: string;
  filename: string;
}

export class Image {
  uuid?: string;
  videoZipUuid: string;
  filename?: string;
  path: string;

  constructor(imageDto: ImageDto) {
    this.uuid = imageDto.uuid;
    this.videoZipUuid = imageDto.videoZipUuid;
    this.path = imageDto.path;
    this.filename = imageDto.filename;
  }
}