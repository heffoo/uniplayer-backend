import { Exclude, Expose } from 'class-transformer';
import { AuthStatus } from '../interfaces/auth-status.interface';

@Exclude()
export class AuthStatusDto implements AuthStatus {
  @Expose()
  signedIn: boolean;
}