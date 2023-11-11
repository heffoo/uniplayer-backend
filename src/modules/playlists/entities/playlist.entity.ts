import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { PlaylistsConstants } from '../playlists.constants';
import { PlaylistEntity } from '../interfaces/playlist-entity.inteface';

@Entity()
export class Playlist implements PlaylistEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: PlaylistsConstants.TITLE_MAX_LENGTH })
  title: string;
}
