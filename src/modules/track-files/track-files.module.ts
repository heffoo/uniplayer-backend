import { Module } from '@nestjs/common';
import { TrackFilesService } from './track-files.service';
import { TrackFilesController } from './track-files.controller';
import { FilesModule } from '../files/files.module';
import { StorageModule } from '../../common/modules/storage/storage.module';

@Module({
  imports: [FilesModule, StorageModule],
  controllers: [TrackFilesController],
  providers: [TrackFilesService],
})
export class TrackFilesModule {}
