import { Exclude, Expose, Transform } from 'class-transformer';
import { IsNumber, Max, Min } from 'class-validator';

@Exclude()
export class PaginationQueryDto {
  @Expose()
  @IsNumber({
    allowNaN: false,
    allowInfinity: false,
  })
  @Min(10)
  @Max(100)
  limit: number;

  @Expose()
  @IsNumber({
    allowNaN: false,
    allowInfinity: false,
  })
  @Min(0)
  offset: number;
}
