import { Exclude, Expose, Type } from 'class-transformer';
import { ListDto } from '../../../../common/dto/list.dto';
import { TracksListItem } from '../interfaces/tracks-list-item.interface';
import { TracksListItemDto } from './tracks-list-item.dto';

@Exclude()
export class TracksListDto extends ListDto<TracksListItem> {
  @Expose()
  @Type(() => TracksListItemDto)
  items: Array<TracksListItem>;
}
