import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ImageUploadService {

  constructor(private configService: ConfigService) {
   
  }
  public async assetsPhotoUpload(file: any): Promise<string>{
        const s3 = this.getS3();
        const fileName = Date.now();
        const originalName = file.originalname;
        const extension = originalName.slice(originalName.lastIndexOf("."));
        const newFileName = `assets/img/${fileName}${extension}`;

      const urlKey =  newFileName
      const params = {
          Body: file.buffer,
          Bucket: this.configService.get<string>('S3_BUCKET'),
          Key: urlKey,
          ACL: 'public-read',
      };

      return new Promise((resolve, reject) => {
        s3.upload(params, (err: any, data: any) => {
        if (err) {
            reject(err.message);
        }
        resolve(data);
        });
    });
  }

  private getS3() {
    return new AWS.S3({
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get<string>('AWS_ACCESS_KEY'),
        region: this.configService.get<string>('S3_REGION')
    });
}

}