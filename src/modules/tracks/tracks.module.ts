import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from './entities/track.entity';
import { UsersModule } from '../users/users.module';
import { PlaylistsToTracksModule } from '../playlists-to-tracks/playlists-to-tracks.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Track]),
    UsersModule,
    PlaylistsToTracksModule,
  ],
  exports: [TypeOrmModule],
})
export class TracksModule {}
