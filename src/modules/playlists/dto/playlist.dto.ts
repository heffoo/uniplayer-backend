import { Exclude, Expose } from 'class-transformer';
import { Playlist } from '../interfaces/playlist.interface';

@Exclude()
export class PlaylistDto implements Playlist {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  persistent: boolean;
}
