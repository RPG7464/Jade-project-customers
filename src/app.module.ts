import { Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common/pipes';
import { CustomersModule } from './customers/customers.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Constants } from './constants/constants';

@Module({
  imports: [CustomersModule, MongooseModule.forRoot(Constants.DATABASE_URL)],
  controllers: [],
  providers: [{ provide: APP_PIPE, useClass: ValidationPipe }],
})
export class AppModule {}
