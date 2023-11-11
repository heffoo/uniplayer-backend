import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class PlaylistDto {
  @Expose()
  id: string;

  @Expose()
  title: string;
}
