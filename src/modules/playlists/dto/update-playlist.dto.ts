import { Exclude, Expose } from 'class-transformer';
import { UpdatePlaylist } from '../interfaces/update-playlist.interface';
import { IsString, MaxLength } from 'class-validator';
import { PlaylistsConstants } from '../playlists.constants';

@Exclude()
export class UpdatePlaylistDto implements UpdatePlaylist {
  @Expose()
  @IsString()
  @MaxLength(PlaylistsConstants.TITLE_MAX_LENGTH)
  title: string;
}
