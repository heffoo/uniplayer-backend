import { Injectable, NotFoundException } from '@nestjs/common';
import { FilesService } from '../files/files.service';
import MusicMeta from 'music-metadata';
import { plainToInstance } from 'class-transformer';
import { FileDto } from '../files/dto/file.dto';
import { StorageService } from '../../common/modules/storage/storage.service';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from '../files/entities/file.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TrackFilesService {
  constructor(
    @InjectRepository(File)
    private readonly filesRepository: Repository<File>,
    private readonly filesService: FilesService,
    private readonly storageService: StorageService,
  ) {}

  async create(consumerId: string, multerFile: Express.Multer.File) {
    const file = await this.filesService.create(consumerId, multerFile);

    return plainToInstance(FileDto, file);
  }

  async findMeta(consumerId: string, id: string) {
    const fileEntity = await this.filesRepository.findOneBy({
      id,
      creatorId: consumerId,
    });

    if (!fileEntity) {
      throw new NotFoundException();
    }

    const file = await this.storageService.download(fileEntity.url);

    const audioMetadata = await MusicMeta.parseBuffer(
      Buffer.from(file.buffer),
      // {
      //   mimeType: file.mimetype,
      //   size: fileEntity.size,
      // },
    );

    return {
      artist: audioMetadata?.common?.artist || null,
      album: audioMetadata?.common?.album || null,
      title: audioMetadata?.common?.title || null,
      picture: audioMetadata?.common?.picture?.length
        ? Buffer.from(audioMetadata.common.picture[0].data).toString('base64')
        : null,
    };
  }
}
