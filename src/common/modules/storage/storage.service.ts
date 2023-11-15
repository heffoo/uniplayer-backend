import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Minio from 'minio';
import * as retry from 'promise-retry';
import * as path from 'path';
import { BucketItem } from 'minio';
import { ConfigType } from '../../../config/configuration';

@Injectable()
export class StorageService implements OnModuleInit {
  private readonly logger = new Logger(StorageService.name);
  private client: Minio.Client;
  private readonly clientOptions: Minio.ClientOptions;
  readonly bucket: string;

  constructor(private readonly configService: ConfigService) {
    this.clientOptions = this.configService.get<
      ConfigType['storageService']['clientOptions']
    >('storageService.clientOptions');
    this.bucket = this.configService.get<
      ConfigType['storageService']['bucket']
    >('storageService.bucket');
    this.client = new Minio.Client({ useSSL: false, ...this.clientOptions });
  }

  async onModuleInit() {
    return await retry(
      {
        minTimeout: 10000,
        retries: 10,
      },
      async (bail, attemptNumber) => {
        try {
          const buckets = await this.client.listBuckets();
          this.logger.log('buckets', JSON.stringify(buckets, null, ' '));
        } catch (error) {
          this.logger.warn(error.message);
          this.logger.warn(`Attempt call ${attemptNumber + 1} ...`);
          bail(error);
        }
      },
    );
  }

  async upload(objectName: string, stream: Buffer, mimetype: string) {
    const metaData = {
      'Content-Type': mimetype,
    };
    await this.client.putObject(this.bucket, objectName, stream, metaData);
    return path.join(this.bucket, objectName);
  }

  delete(url: string) {
    const objectName = this.getObjectNameFromUrl(url);
    return this.client.removeObject(this.bucket, objectName);
  }

  async deleteMultipleObjects(objectNames: Array<string>) {
    const formattedObjectNames = objectNames.map((name) =>
      this.getObjectNameFromUrl(name),
    );
    return this.client.removeObjects(this.bucket, formattedObjectNames);
  }

  async download(url: string): Promise<Buffer> {
    const objectName = this.getObjectNameFromUrl(url);
    return new Promise((resolve, reject) => {
      const data = [];
      return this.client.getObject(
        this.bucket,
        objectName,
        (err, dataStream) => {
          if (err) {
            return reject(err);
          }
          dataStream.on('data', (chunk) => data.push(chunk));
          dataStream.on('end', () => resolve(Buffer.concat(data)));
          dataStream.on('error', (err) => reject(err));
        },
      );
    });
  }

  async downloadWithStream(url: string) {
    const objectName = this.getObjectNameFromUrl(url);
    return this.client.getObject(this.bucket, objectName);
  }

  async getObjectList(prefix?: string): Promise<Array<BucketItem>> {
    return new Promise((resolve, reject) => {
      const bucketItems = [];
      const stream = this.client.listObjects(this.bucket, prefix, true);
      stream.on('data', (data) => {
        bucketItems.push(data);
      });
      stream.on('end', () => resolve(bucketItems));
      stream.on('error', (err) => reject(err));
    });
  }

  /**
   * Remove the bucket name from the url because it's already there in the removeObject function.
   */
  getObjectNameFromUrl(url: string) {
    const pathParts = url.split('/');
    if (pathParts[0] !== this.bucket) {
      return url;
    }
    return pathParts.slice(1).join('/');
  }
}
