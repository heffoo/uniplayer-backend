import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PlaylistsToTracksEntity } from '../interfaces/playlists-to-tracks-entity.interface';
import { Playlist } from '../../playlists/entities/playlist.entity';
import { Track } from '../../tracks/entities/track.entity';

@Entity()
export class PlaylistsToTracks implements PlaylistsToTracksEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  playlistId: string;

  @Column('uuid')
  trackId: string;

  @Column()
  weight: number;

  @ManyToOne(() => Playlist, (playlist) => playlist.playlistsToTracks)
  playlists: Playlist;

  @ManyToOne(() => Track, (track) => track.playlistsToTracks)
  tracks: Track;
}