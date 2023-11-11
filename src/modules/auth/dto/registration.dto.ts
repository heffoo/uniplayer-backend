import { Exclude, Expose } from 'class-transformer';
import { Registration } from '../interfaces/registration.interface';
import { IsString, Length } from 'class-validator';
import { UserConstants } from '../../users/user.constants';
import { AuthConstants } from '../auth.constants';

@Exclude()
export class RegistrationDto implements Registration {
  @Expose()
  @IsString()
  @Length(UserConstants.USERNAME_MIN_LENGTH, UserConstants.USERNAME_MAX_LENGTH)
  username: string;

  @Expose()
  @IsString()
  @Length(
    AuthConstants.REGISTRATION_PASSWORD_MIN_LENGTH,
    AuthConstants.REGISTRATION_PASSWORD_MAX_LENGTH,
  )
  password: string;
}
