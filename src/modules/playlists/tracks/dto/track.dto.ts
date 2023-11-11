import { Exclude, Expose } from 'class-transformer';
import { Track } from '../entities/track.entity';

@Exclude()
export class TrackDto implements Track {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  singerName: string;

  @Expose()
  albumName: string;

  @Expose()
  coverFileId: string;

  @Expose()
  trackFileId: string;
}
