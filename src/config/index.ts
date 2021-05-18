import { ConfigService } from "@nestjs/config";


const _configService = new ConfigService();
 
export const ENVIRONMENT = _configService.get<string>('ENVIRONMENT');

export const SHOULD_MIGRATE = false;
export const APP_URL = process.env.APP_URL;
export const BASE_PATH = process.env.BASE_PATH;
export const DB_NAME = process.env.DB_NAME;
export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_HOST = process.env.DB_HOST;
// export const JWT_SECRET = process.env.JWT_SECRET;

export const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
export const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
export const S3_REGION = process.env.S3_REGION;
export const S3_BUCKET = process.env.S3_BUCKET;

export const OAUTH_CLIENT_ID = process.env.OAUTH_CLIENT_ID;
export const OAUTH_CLIENT_SECRET = process.env.OAUTH_CLIENT_SECRET;
export const OAUTH_REFRESH_TOKEN = process.env.OAUTH_REFRESH_TOKEN;
export const UVAPIKEY = process.env.UVAPIKEY;
// export const CLICKATELL_APIKEY = process.env.CLICKATELL_APIKEY;

