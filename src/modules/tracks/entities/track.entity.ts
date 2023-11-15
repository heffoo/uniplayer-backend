import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TrackEntity } from '../interfaces/track-entity.interface';
import { TracksConstants } from '../tracks.constants';
import { User } from '../../users/entities/user.entity';
import { PlaylistsToTracks } from '../../playlists-to-tracks/entities/playlists-to-tracks.entity';

@Entity()
export class Track implements TrackEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: TracksConstants.TITLE_MAX_LENGTH })
  title: string;

  @Column({ length: TracksConstants.SINGER_MAX_LENGTH })
  singerName: string;

  @Column({ length: TracksConstants.ALBUM_MAX_LENGTH, nullable: true })
  albumName: string;

  @Column({ nullable: true })
  duration: number;

  @Column('uuid', { nullable: true })
  coverFileId: string;

  @Column('uuid')
  trackFileId: string;

  @Column('uuid')
  creatorId: string;

  @ManyToOne(() => User, (user) => user.tracks)
  creator: User;

  @OneToMany(() => PlaylistsToTracks, (playlistsToTracks) => playlistsToTracks.tracks)
  playlistsToTracks: Array<PlaylistsToTracks>
}
