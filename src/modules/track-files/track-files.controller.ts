import {
  Controller,
  Post,
  Body,
  Headers,
  UseGuards,
  UseInterceptors,
  PayloadTooLargeException,
  UnsupportedMediaTypeException,
  UploadedFile,
} from '@nestjs/common';
import { TrackFilesService } from './track-files.service';
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

@ApiTags('track-files')
@Controller('track-files')
@UseGuards(AuthGuard)
export class TrackFilesController {
  constructor(private readonly trackFilesService: TrackFilesService) {}

  @ApiBody({ type: CreateFileDto })
  @ApiConsumes('multipart/form-data')
  @ApiUnsupportedMediaTypeResponse({
    description: UnsupportedMediaTypeException.name,
  })
  @ApiPayloadTooLargeResponse({ description: PayloadTooLargeException.name })
  @UseInterceptors(
    FileInterceptor('file'),
    //     {
    //   limits: {
    //     fileSize: FilesConstants.FILE_MAX_SIZE,
    //   },
    // }),
  )
  @Post()
  create(
    @Headers('consumerId') consumerId: string,
    @UploadedFile() multerFile: Express.Multer.File,
  ) {
    return this.trackFilesService.create(consumerId, multerFile);
  }
}
