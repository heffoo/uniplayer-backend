import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../interfaces/user-entity.interface';
import { UserConstants } from '../user.constants';

@Entity()
export class User implements UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: UserConstants.USERNAME_MAX_LENGTH })
  username: string;

  @Column()
  password: string;
}
