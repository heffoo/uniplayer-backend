import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TrackEntity } from '../interfaces/track-entity.interface';
import { PlaylistTracksConstants } from '../playlist-tracks.constants';

@Entity()
export class Track implements TrackEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: PlaylistTracksConstants.TITLE_MAX_LENGTH })
  title: string;

  @Column({ length: PlaylistTracksConstants.SINGER_MAX_LENGTH })
  singerName: string;

  @Column({ length: PlaylistTracksConstants.ALBUM_MAX_LENGTH })
  albumName: string;

  @Column()
  coverFileId: string;

  @Column()
  trackFileId: string;
}
