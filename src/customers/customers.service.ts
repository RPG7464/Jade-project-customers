import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from './schemas/customer.schema';
import { Model } from 'mongoose';
import { CreateCustomerDto } from './dtos/createCustomer.dto';
import { UpdateCustomerDto } from './dtos/updateCustomerDto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer.name)
    private customerModel: Model<Customer>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createCustomerDto: CreateCustomerDto) {
    const customer = await this.findOneByEmail(createCustomerDto.email);
    if (customer) {
      throw new BadRequestException('This customer is already exists');
    } else {
      return await this.customerModel.create({
        name: createCustomerDto.name,
        email: createCustomerDto.email,
        status: createCustomerDto.status,
        billingAddress: {
          street: createCustomerDto.billingAddress.street,
          province: createCustomerDto.billingAddress.province,
          municipality: createCustomerDto.billingAddress.municipality,
        },
        refresh_token: createCustomerDto.refresh_token,
        password: await bcrypt.hash(createCustomerDto.password, 10),
      });
    }
  }

  async findAll() {
    return await this.customerModel.find();
  }

  async findOne(id: string) {
    try {
      const customer = await this.customerModel.findById(id).exec();
      if (!customer) {
        throw new NotFoundException(
          `The customer with id: ${id} was not found`,
        );
      }
      return customer;
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto) {
    try {
      const customer = await this.customerModel.findById(id).exec();
      if (!customer) {
        throw new NotFoundException(
          `The customer with id: ${id} was not found`,
        );
      }

      return await this.customerModel
        .findByIdAndUpdate(id, updateCustomerDto, { new: true })
        .exec();
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(id: string) {
    try {
      const customer = await this.customerModel.findById(id).exec();

      if (!customer) {
        throw new NotFoundException(`The customer with id:${id} was not found`);
      }

      return await this.customerModel.findByIdAndRemove(id).exec();
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOneByEmail(email: string) {
    return await this.customerModel.findOne({ email });
  }

  async validate(email: string, password: string): Promise<any> {
    const customer = await this.findOneByEmail(email);
    const pass = await bcrypt.compare(password, customer.password);
    if (customer && pass) {
      return customer;
    }
    return null;
  }

  async login(customer: any) {
    const payload = { email: customer.email, sub: customer.customerId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
