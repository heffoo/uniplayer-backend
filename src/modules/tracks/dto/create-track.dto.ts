import { Exclude, Expose } from 'class-transformer';
import { CreateTrack } from '../interfaces/create-track.interface';
import { IsString, IsUUID, MaxLength, MinLength } from 'class-validator';
import { TracksConstants } from '../tracks.constants';

@Exclude()
export class CreateTrackDto implements CreateTrack {
  @Expose()
  @IsString()
  @MinLength(TracksConstants.TITLE_MIN_LENGTH)
  @MaxLength(TracksConstants.TITLE_MAX_LENGTH)
  title: string;

  @Expose()
  @IsString()
  @MinLength(TracksConstants.SINGER_MIN_LENGTH)
  @MaxLength(TracksConstants.SINGER_MAX_LENGTH)
  singerName: string;

  @Expose()
  @IsString()
  @MinLength(TracksConstants.ALBUM_MIN_LENGTH)
  @MaxLength(TracksConstants.ALBUM_MAX_LENGTH)
  albumName: string;

  @Expose()
  @IsUUID(4)
  coverFileId: string;

  @Expose()
  @IsUUID(4)
  trackFileId: string;
}
