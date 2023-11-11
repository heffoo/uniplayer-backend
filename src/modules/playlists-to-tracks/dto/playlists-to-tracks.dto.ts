import { Exclude, Expose } from 'class-transformer';
import { PlaylistsToTracks } from '../interfaces/playlists-to-tracks.interface';

@Exclude()
export class PlaylistsToTracksDto implements PlaylistsToTracks {
  @Expose()
  id: string;

  @Expose()
  playlistId: string;

  @Expose()
  trackId: string;
}