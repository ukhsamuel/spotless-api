import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AuthenticationModule } from './authentication/authentication.module';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { TasksModule } from './tasks/tasks.module';
import { WorkersModule } from './workers/workers.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }), 
    DatabaseModule,
    AuthenticationModule,
    UsersModule,
    OrdersModule,
    TasksModule,
    WorkersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
