import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ClientOptions } from 'minio';
import * as process from 'process';
import { JwtSignOptions } from '@nestjs/jwt';

export type ConfigType = {
  database: TypeOrmModuleOptions;
  app: {
    port: number;
    isSwaggerEnabled: boolean;
    isProd: boolean;
  };
  auth: {
    jwt: {
      secret: string;
      signOptions: JwtSignOptions;
    };
  };
  storageService: {
    clientOptions: ClientOptions;
    bucket: string;
  };
};

export default (): ConfigType => ({
  database: {
    type: 'postgres',
    host: process.env.API_DB_HOST || 'localhost',
    port: Number.parseInt(process.env.API_DB_PORT, 10) || 5432,
    username: process.env.API_DB_USERNAME,
    password: process.env.API_DB_PASSWORD,
    database: process.env.API_DB_NAME,
    autoLoadEntities: true,
    synchronize: true,
    logging: process.env.API_DB_LOGGING === 'true',
  },
  app: {
    port: Number.parseInt(process.env.API_PORT, 10) || 3000,
    isSwaggerEnabled: process.env.API_SWAGGER_ENABLED === 'true',
    isProd: process.env.NODE_ENV === 'production',
  },
  auth: {
    jwt: {
      secret: process.env.API_AUTH_JWT_SECRET,
      signOptions: process.env.API_AUTH_JWT_SINGN_OPTIONS
        ? JSON.parse(process.env.API_AUTH_JWT_SINGN_OPTIONS)
        : { expiresIn: '30d' },
    },
  },
  storageService: {
    clientOptions: {
      endPoint: process.env.S3_ENDPOINT || 'localhost',
      port: Number.parseInt(process.env.S3_PORT, 10) || 9000,
      secretKey: process.env.S3_SECRET_KEY || 'minioadmin',
      accessKey: process.env.S3_ACCESS_KEY || 'minioadmin',
    },
    bucket: process.env.S3_BUCKET || 'public',
  },
});
