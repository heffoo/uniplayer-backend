import { Exclude, Expose } from 'class-transformer';
import { File } from '../intefaces/file.interface';

@Exclude()
export class FileDto implements File {
  @Expose()
  id: string;

  @Expose()
  originalName: string;

  @Expose()
  url: string;
}
