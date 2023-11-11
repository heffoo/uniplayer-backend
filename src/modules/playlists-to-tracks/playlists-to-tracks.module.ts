import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaylistsToTracks } from './entities/playlists-to-tracks.entity';
import { PlaylistsToTracksService } from './playlists-to-tracks.service';
import { PlaylistsModule } from '../playlists/playlists.module';
import { TracksModule } from '../tracks/tracks.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PlaylistsToTracks]),
    forwardRef(() => PlaylistsModule),
    forwardRef(() => TracksModule),
  ],
  controllers: [],
  providers: [PlaylistsToTracksService],
  exports: [TypeOrmModule],
})
export class PlaylistsToTracksModule {}
