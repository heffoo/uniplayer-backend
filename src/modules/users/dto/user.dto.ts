import { Exclude, Expose } from 'class-transformer';
import { User } from '../interfaces/user.interface';

@Exclude()
export class UserDto implements User {
  @Expose()
  id: string;

  @Expose()
  username: string;
}
