import { Injectable, NotFoundException } from '@nestjs/common';
import { FilesService } from '../files/files.service';
import { plainToInstance } from 'class-transformer';
import { FileDto } from '../files/dto/file.dto';
import { StorageService } from '../../common/modules/storage/storage.service';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from '../files/entities/file.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CoverFilesService {
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

  async findById(consumerId: string, id: string) {
    const fileEntity = await this.filesRepository.findOneBy({
      id,
      creatorId: consumerId,
    });

    if (!fileEntity) {
      throw new NotFoundException();
    }

    return this.storageService.downloadWithStream(fileEntity.url);
  }
}
