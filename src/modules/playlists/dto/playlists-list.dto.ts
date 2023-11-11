import { Exclude, Expose, Type } from 'class-transformer';
import { ListDto } from '../../../common/dto/list.dto';
import { PlaylistsListItemDto } from './playlists-list-item.dto';
import { PlaylistsListItem } from '../interfaces/playlists-list-item.interface';

@Exclude()
export class PlaylistsListDto extends ListDto<PlaylistsListItem> {
  @Expose()
  @Type(() => PlaylistsListItemDto)
  items: Array<PlaylistsListItem>;
}
