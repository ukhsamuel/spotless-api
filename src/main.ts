import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder, SwaggerDocumentOptions } from '@nestjs/swagger';
// import { ExceptionsFilter } from './utils/app.error';
import { AppModule } from './app.module';
// import { logger } from './utils/logger';
import * as morgan from 'morgan';
import { useContainer } from 'class-validator';
import { ValidationPipe } from '@nestjs/common';

let PORT: number;

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api/v1');
  app.use(morgan('dev'));
  app.useGlobalPipes(new ValidationPipe({ disableErrorMessages: false}));
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  // app.useGlobalFilters(new ExceptionsFilter());
  
  const options: SwaggerDocumentOptions =  {
    operationIdFactory: (
      controllerKey: string,
      methodKey: string
    ) => methodKey
  };
  const config = new DocumentBuilder()
  .setTitle('SPOTLESS API')
  .setDescription('SPOTLESS API DOCS')
  .setVersion('1.0')
  .addTag('spotless')
  // .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'header' },
  //                  'Authorization')
  .build();
const document = SwaggerModule.createDocument(app, config, options);
SwaggerModule.setup('api', app, document);

  const configService = app.get(ConfigService);
  PORT  = configService.get<number>('PORT');
  
  await app.listen(configService.get<number>('PORT') || 8080); 



  // const app = await NestFactory.create(AppModule);
  // await app.listen(3000);
}
bootstrap();
