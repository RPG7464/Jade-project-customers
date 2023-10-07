import { Module } from '@nestjs/common';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Customer, CustomerSchema } from './schemas/customer.schema';
import { JwtModule } from '@nestjs/jwt/dist';
import { Constants } from 'src/constants/constants';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategys/local.strategy';
import { JwtStrategy } from './strategys/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      global: true,
      secret: Constants.secret,
      signOptions: { expiresIn: '1d' },
    }),
    MongooseModule.forFeature([
      {
        name: Customer.name,
        schema: CustomerSchema,
      },
    ]),
  ],
  controllers: [CustomersController],
  providers: [CustomersService, LocalStrategy, JwtStrategy],
  exports: [CustomersModule],
})
export class CustomersModule {}
