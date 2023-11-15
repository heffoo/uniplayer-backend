import {
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
  PayloadTooLargeException,
  UnsupportedMediaTypeException,
  UploadedFile,
  Get,
  Param, StreamableFile,
} from '@nestjs/common';
import { CoverFilesService } from './cover-files.service';
import { CreateFileDto } from '../files/dto/create-file.dto';
import {
  ApiBody,
  ApiConsumes,
  ApiPayloadTooLargeResponse,
  ApiTags,
  ApiUnsupportedMediaTypeResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { ConsumerId } from '../../common/decorators/consumer-id.decorator';
import { createReadStream } from 'fs';
import { Readable} from 'stream';

@ApiTags('cover-files')
@Controller('cover-files')
@UseGuards(AuthGuard)
export class CoverFilesController {
  constructor(private readonly coverFilesService: CoverFilesService) {}

  @ApiBody({ type: CreateFileDto })
  @ApiConsumes('multipart/form-data')
  @ApiUnsupportedMediaTypeResponse({
    description: UnsupportedMediaTypeException.name,
  })
  @ApiPayloadTooLargeResponse({ description: PayloadTooLargeException.name })
  @UseInterceptors(FileInterceptor('file'))
  @Post()
  create(
    @ConsumerId() consumerId: string,
    @UploadedFile() multerFile: Express.Multer.File,
  ) {
    return this.coverFilesService.create(consumerId, multerFile);
  }

  @Get(':id')
  async findById(
    @ConsumerId() consumerId: string,
    @Param('id') id: string,
  ) {
    const fileStream = await this.coverFilesService.findById(consumerId, id);
    return new StreamableFile(fileStream);
  }
}
