import { Exclude, Expose } from 'class-transformer';
import { TrackFileMeta } from '../interfaces/track-file-meta.interface';

@Exclude()
export class TrackFileMetaDto implements TrackFileMeta {
  @Expose()
  artist: string | null;

  @Expose()
  album: string| null;

  @Expose()
  title: string | null;

  @Expose()
  picture: string | null;

  @Expose()
  duration: number | null;

  @Expose()
  bitrate: number| null;
}