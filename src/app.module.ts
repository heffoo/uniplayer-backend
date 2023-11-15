import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlaylistsModule } from './modules/playlists/playlists.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { TrackFilesModule } from './modules/track-files/track-files.module';
import { FilesModule } from './modules/files/files.module';
import { StorageModule } from './common/modules/storage/storage.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration, { ConfigType } from './config/configuration';
import { TracksModule } from './modules/tracks/tracks.module';
import { PlaylistsToTracksModule } from './modules/playlists-to-tracks/playlists-to-tracks.module';
import { CoverFilesModule } from './modules/cover-files/cover-files.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return configService.get<ConfigType['database']>('database');
      },
      inject: [ConfigService],
    }),
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return configService.get<ConfigType['auth']['jwt']>('auth.jwt');
      },
      inject: [ConfigService],
    }),
    PlaylistsModule,
    TracksModule,
    PlaylistsToTracksModule,
    AuthModule,
    UsersModule,
    TrackFilesModule,
    CoverFilesModule,
    FilesModule,
    StorageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
