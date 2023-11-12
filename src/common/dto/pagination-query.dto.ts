import { Exclude, Expose, Transform } from 'class-transformer';
import { IsNumber, isNumberString, Max, Min } from 'class-validator';

@Exclude()
export class PaginationQueryDto {
  @Expose()
  @IsNumber({
    allowNaN: false,
    allowInfinity: false,
  })
  @Min(10)
  @Max(100)
  @Transform(({ value }) => isNumberString(value) && Number(value))
  limit: number;

  @Expose()
  @IsNumber({
    allowNaN: false,
    allowInfinity: false,
  })
  @Min(0)
  @Max(100)
  @Transform(({ value }) => isNumberString(value) && Number(value))
  offset: number;
}
