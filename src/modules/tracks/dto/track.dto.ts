import { Exclude, Expose } from 'class-transformer';
import { Track } from '../interfaces/track.interface';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class TrackDto implements Track {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  singerName: string;

  @ApiProperty({ nullable: true })
  @Expose()
  albumName: string | null;

  @ApiProperty({ nullable: true })
  @Expose()
  duration: number | null;

  @ApiProperty({ nullable: true })
  @Expose()
  coverFileId: string | null;

  @Expose()
  trackFileId: string;

  @Expose()
  playlistIds: Array<string>;
}
