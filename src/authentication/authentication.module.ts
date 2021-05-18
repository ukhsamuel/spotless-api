import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
// import { SharedModule } from '../../app.module';



@Module({
  imports:[
    PassportModule,
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: '14d' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    AuthenticationService,
    LocalStrategy,
    JwtStrategy
  ],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
