import { Module } from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { PlaylistsController } from './playlists.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Playlist } from './entities/playlist.entity';
import { PlaylistTracksService } from './tracks/playlist-tracks.service';
import { PlaylistTracksController } from './tracks/playlist-tracks.controller';
import { TracksModule } from '../tracks/tracks.module';
import { PlaylistsToTracksModule } from '../playlists-to-tracks/playlists-to-tracks.module';

@Module({
  imports: [TypeOrmModule.forFeature([Playlist]), TracksModule, PlaylistsToTracksModule],
  controllers: [PlaylistsController, PlaylistTracksController],
  providers: [PlaylistsService, PlaylistTracksService],
  exports: [TypeOrmModule, PlaylistsService],
})
export class PlaylistsModule {}
