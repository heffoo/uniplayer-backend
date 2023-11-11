import { Module } from '@nestjs/common';
import { TrackFilesService } from './track-files.service';
import { TrackFilesController } from './track-files.controller';
import { FilesModule } from '../files/files.module';

@Module({
  imports: [FilesModule],
  controllers: [TrackFilesController],
  providers: [TrackFilesService],
})
export class TrackFilesModule {}
