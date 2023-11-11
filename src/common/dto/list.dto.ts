import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ListDto<T> {
  @Expose()
  items: Array<T>;

  @Expose()
  count: number;
}
