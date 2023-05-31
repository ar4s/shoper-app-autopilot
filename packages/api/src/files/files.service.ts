import detectMime from 'mime-kind';
import { Client } from 'minio';
import { InjectMinio } from 'nestjs-minio';

import { Injectable } from '@nestjs/common';

const getDownloadPolicy = (bucketName: string) =>
  JSON.stringify({
    Statement: [
      {
        Action: ['s3:GetBucketLocation', 's3:ListBucket'],
        Effect: 'Allow',
        Principal: {
          AWS: ['*'],
        },
        Resource: [`arn:aws:s3:::${bucketName}`],
      },
      {
        Action: ['s3:GetObject'],
        Effect: 'Allow',
        Principal: {
          AWS: ['*'],
        },
        Resource: [`arn:aws:s3:::${bucketName}/*`],
      },
    ],
    Version: '2012-10-17',
  });

const getLifecycleConfig = () => {
  return {
    Rule: [
      {
        ID: 'Expiration Date Rule',
        Status: 'Enabled',
        Filter: {
          Prefix: '',
        },
        Expiration: {
          Days: 365,
        },
      },
    ],
  };
};

@Injectable()
export class FilesService {
  constructor(@InjectMinio() private readonly minio: Client) {}
  async uploadFile(file: Express.Multer.File): Promise<string> {
    return 'https://example.com';
  }

  async addFileToBucket(bucketName: string, name: string, data: Buffer) {
    const mime = (await detectMime(data)) as { ext: string; mime: string };
    try {
      await this.minio.putObject(bucketName, name, data, {
        'Content-Type': mime.mime,
      });
    } catch (e) {
      console.error(e);
      throw new Error('Failed to upload file, please try again later');
    }
  }

  async removeFileFromBucket(bucketName: string, name: string) {
    try {
      await this.minio.removeObject(bucketName, name);
    } catch (e) {
      console.error(e);
      throw new Error('Failed to remove file, please try again later');
    }
  }

  async createBucket(
    bucketName: string,
  ): Promise<{ created: boolean | 'existed' }> {
    try {
      await this.minio.makeBucket(bucketName, 'us-east-1');
      await this.minio.setBucketPolicy(
        bucketName,
        getDownloadPolicy(bucketName),
      );
      await this.minio.setBucketLifecycle(bucketName, getLifecycleConfig());
    } catch (e) {
      if (e.code === 'BucketAlreadyOwnedByYou') {
        return { created: 'existed' };
      }
      return { created: false };
    } finally {
      return { created: true };
    }
  }
}
