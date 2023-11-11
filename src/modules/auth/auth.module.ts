import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { PlaylistsModule } from '../playlists/playlists.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), PlaylistsModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
