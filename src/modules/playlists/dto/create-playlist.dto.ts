import { Exclude, Expose } from 'class-transformer';
import { IsString, MaxLength } from 'class-validator';
import { PlaylistsConstants } from '../playlists.constants';
import { CreatePlaylist } from '../interfaces/create-playlist.interface';

@Exclude()
export class CreatePlaylistDto implements CreatePlaylist {
  @Expose()
  @IsString()
  @MaxLength(PlaylistsConstants.TITLE_MAX_LENGTH)
  title: string;
}
