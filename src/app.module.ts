import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    UsersModule,
    ReportsModule,
    MongooseModule.forRoot('mongodb://localhost:27017/nestjs'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
