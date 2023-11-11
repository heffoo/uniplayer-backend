import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PlaylistsConstants } from '../playlists.constants';
import { PlaylistEntity } from '../interfaces/playlist-entity.inteface';
import { User } from '../../users/entities/user.entity';
import { PlaylistsToTracks } from '../../playlists-to-tracks/entities/playlists-to-tracks.entity';

@Entity()
export class Playlist implements PlaylistEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: PlaylistsConstants.TITLE_MAX_LENGTH })
  title: string;

  @Column({ default: false })
  persistent: boolean;

  @Column({ default: null })
  weight: number;

  @Column('uuid')
  creatorId: string;

  @ManyToOne(() => User, (user) => user.playlists)
  creator: User;

  @OneToMany(() => PlaylistsToTracks, (playlistsToTracks) => playlistsToTracks.playlists)
  playlistsToTracks: Array<PlaylistsToTracks>
}
