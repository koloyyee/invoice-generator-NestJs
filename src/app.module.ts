import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { CustomerController } from './customers/customer.controller';
import { CustomersModule } from './customers/customer.module';
import { InvoicesModule } from './invoices/invoices.module';
import { logger } from './logger.middleware';
import { UsersModule } from './users/users.module';
import { StatusModule } from './status/status.module';

dotenv.config();

@Module({
  imports: [
    CustomersModule,
    MongooseModule.forRoot(`${process.env.DB_CONN_STRING}`),
    InvoicesModule,
    AuthModule,
    UsersModule,
    StatusModule,
  ],
  controllers: [AppController],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(logger).forRoutes(CustomerController);
  }
}
