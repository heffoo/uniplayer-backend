import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from './entities/track.entity';
import { UsersModule } from '../users/users.module';
import { PlaylistsToTracksModule } from '../playlists-to-tracks/playlists-to-tracks.module';
import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';
import { PlaylistsModule } from '../playlists/playlists.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Track]),
    UsersModule,
    forwardRef(() => PlaylistsModule),
    PlaylistsToTracksModule,
  ],
  controllers: [TracksController],
  providers: [TracksService],
  exports: [TypeOrmModule],
})
export class TracksModule {}
