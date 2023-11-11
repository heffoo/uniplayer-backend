import { Exclude, Expose } from 'class-transformer';
import { CreateTrack } from '../interfaces/create-track.interface';
import { IsString, IsUUID, MaxLength, MinLength } from 'class-validator';
import { PlaylistTracksConstants } from '../playlist-tracks.constants';

@Exclude()
export class CreateTrackDto implements CreateTrack {
  @Expose()
  @IsString()
  @MinLength(PlaylistTracksConstants.TITLE_MIN_LENGTH)
  @MaxLength(PlaylistTracksConstants.TITLE_MAX_LENGTH)
  title: string;

  @Expose()
  @IsString()
  @MinLength(PlaylistTracksConstants.SINGER_MIN_LENGTH)
  @MaxLength(PlaylistTracksConstants.SINGER_MAX_LENGTH)
  singerName: string;

  @Expose()
  @IsString()
  @MinLength(PlaylistTracksConstants.ALBUM_MIN_LENGTH)
  @MaxLength(PlaylistTracksConstants.ALBUM_MAX_LENGTH)
  albumName: string;

  @Expose()
  @IsUUID(4)
  coverFileId: string;

  @Expose()
  @IsUUID(4)
  trackFileId: string;
}
