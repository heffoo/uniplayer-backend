import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../interfaces/user-entity.interface';
import { UserConstants } from '../user.constants';
import { Playlist } from '../../playlists/entities/playlist.entity';
import { Track } from '../../tracks/entities/track.entity';

@Entity()
export class User implements UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: UserConstants.USERNAME_MAX_LENGTH })
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Playlist, (playlist) => playlist.creator)
  playlists: Array<Playlist>

  @OneToMany(() => Track, (track) => track.creator)
  tracks: Array<Track>
}
