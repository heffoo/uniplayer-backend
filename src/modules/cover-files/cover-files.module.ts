import { Module } from '@nestjs/common';
import { CoverFilesService } from './cover-files.service';
import { CoverFilesController } from './cover-files.controller';
import { FilesModule } from '../files/files.module';
import { StorageModule } from '../../common/modules/storage/storage.module';

@Module({
  imports: [StorageModule, FilesModule],
  controllers: [CoverFilesController],
  providers: [CoverFilesService],
})
export class CoverFilesModule {}
