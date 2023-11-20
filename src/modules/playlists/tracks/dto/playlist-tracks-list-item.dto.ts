import { Exclude, Expose } from 'class-transformer';
import { TracksListItem } from '../interfaces/tracks-list-item.interface';

@Exclude()
export class PlaylistTracksListItemDto implements TracksListItem {
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

  @Expose()
  duration: number;

  @Expose()
  playlistIds: Array<string>;
}
