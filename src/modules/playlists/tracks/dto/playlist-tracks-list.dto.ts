import { Exclude, Expose, Type } from 'class-transformer';
import { ListDto } from '../../../../common/dto/list.dto';
import { TracksListItem } from '../interfaces/tracks-list-item.interface';
import { PlaylistTracksListItemDto } from './playlist-tracks-list-item.dto';

@Exclude()
export class PlaylistTracksListDto extends ListDto<TracksListItem> {
  @Expose()
  @Type(() => PlaylistTracksListItemDto)
  items: Array<TracksListItem>;
}
