import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
 
@Module({
  imports: [
    SequelizeModule.forRootAsync({
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          dialect: 'mysql',
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get<string>('DB_USER'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_NAME'),
          autoLoadModels: true,
          // synchronize: true,
          // alter: true,
          logging: true,
          dialectOptions: {
            supportBigNumbers: true,
            bigNumberStrings: true,
          },
          define: {
            charset: "utf8mb4",
            collate: "utf8mb4_unicode_ci",
            createdAt: "created_at",
            updatedAt: "updated_at",
            deletedAt: "deleted_at",
            paranoid: true,
            underscored: true,
          },
          pool: {
            max: 5,
            min: 2,
            acquire: 30000,
            idle: 20000,
          },
        }),
        inject: [ConfigService],
      }),
  ],
})
export class DatabaseModule {}
