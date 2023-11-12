import { Exclude, Expose } from 'class-transformer';
import { AddPlaylistTrack } from '../interfaces/add-playlist-track.interface';
import { IsUUID } from 'class-validator';

@Exclude()
export class AddPlaylistTrackDto implements AddPlaylistTrack {
  @Expose()
  @IsUUID(4)
  trackId: string;
}
