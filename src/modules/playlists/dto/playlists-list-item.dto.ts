import { Exclude, Expose } from 'class-transformer';
import { PlaylistsListItem } from '../interfaces/playlists-list-item.interface';

@Exclude()
export class PlaylistsListItemDto implements PlaylistsListItem {
  @Expose()
  id: string;

  @Expose()
  title: string;
}
