import { Injectable } from '@nestjs/common';
import { FilesService } from '../files/files.service';
import { CreateFileDto } from '../files/dto/create-file.dto';
import MusicMeta from 'music-metadata';

@Injectable()
export class TrackFilesService {
  constructor(private readonly filesService: FilesService) {}

  async create(consumerId: string, multerFile: Express.Multer.File) {
    const audioMetadata = await MusicMeta.parseBuffer(
      Buffer.from(multerFile.buffer),
      {
        mimeType: multerFile.mimetype,
        size: multerFile.size,
      },
    );

    // const file = await this.filesService.create(consumerId, multerFile);

    return {
      artist: audioMetadata.common.artist,
      album: audioMetadata.common.album,
      picture: audioMetadata.common.picture,
      title: audioMetadata.common.title,
    };
  }
}
