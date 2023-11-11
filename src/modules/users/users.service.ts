import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { plainToInstance } from 'class-transformer';
import { UserDto } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findOne(consumerId: string, id: string) {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user || user.id !== consumerId) {
      throw new NotFoundException();
    }

    return plainToInstance(UserDto, user);
  }
}
