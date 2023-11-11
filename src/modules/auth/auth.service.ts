import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Registration } from './interfaces/registration.interface';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { plainToInstance } from 'class-transformer';
import { UserDto } from '../users/dto/user.dto';
import { SignIn } from './interfaces/sign-in.interface';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(registrationDto: Registration) {
    const foundUserWithUniqueUsername = await this.usersRepository.findOneBy({
      username: registrationDto.username,
    });

    if (foundUserWithUniqueUsername) {
      throw new ConflictException();
    }
    // todo: посолить пароль
    const newUser = await this.usersRepository.save(
      this.usersRepository.create(registrationDto),
    );

    return plainToInstance(UserDto, newUser);
  }

  async signIn(signInDto: SignIn) {
    const user = await this.usersRepository.findOneBy({
      username: signInDto.username,
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    if (user.password !== signInDto.password) {
      throw new UnauthorizedException();
    }
    // todo: посолить пароль и проверить
    return this.jwtService.signAsync({ consumerId: user.id });
  }
}
