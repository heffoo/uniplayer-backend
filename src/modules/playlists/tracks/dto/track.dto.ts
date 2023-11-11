import { Exclude, Expose } from 'class-transformer';
import { Track } from '../interfaces/track.interface';

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
