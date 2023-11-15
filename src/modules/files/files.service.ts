import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from './entities/file.entity';
import { Repository } from 'typeorm';
import * as nodePath from 'node:path';
import { StorageService } from '../../common/modules/storage/storage.service';
import { plainToInstance } from 'class-transformer';
import { FileDto } from './dto/file.dto';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File)
    private readonly filesRepository: Repository<File>,
    private readonly storageService: StorageService,
  ) {}

  async create(consumerId: string, multerFile: Express.Multer.File) {
    if (!multerFile) {
      throw new BadRequestException('File is required');
    }

    const filePath = multerFile.path || '';

    const newFileEntity = this.filesRepository.create({
      creatorId: consumerId,
      originalName: multerFile.originalname,
      ext: nodePath.extname(multerFile.originalname),
      size: multerFile.size.toString(),
      path: nodePath.join(this.storageService.bucket, filePath),
    });

    await this.filesRepository.save(newFileEntity);

    const objectName = nodePath.join(filePath, newFileEntity.name);
    await this.storageService.upload(
      objectName,
      multerFile.buffer,
      multerFile.mimetype,
    );

    return newFileEntity;
  }

  async findOne(consumerId: string, id: string) {
    const file = await this.filesRepository.findOneBy({
      id,
      creatorId: consumerId,
    });

    if (!file) {
      throw new NotFoundException();
    }

    return plainToInstance(FileDto, file);
  }
}
