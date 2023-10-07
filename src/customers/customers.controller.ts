import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dtos/createCustomer.dto';
import { UpdateCustomerDto } from './dtos/updateCustomerDto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('customers')
export class CustomersController {
  constructor(private customerService: CustomersService) {}

  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto);
  }

  @Post('login')
  login(
    @Body()
    loginDto: UpdateCustomerDto,
  ) {
    return this.customerService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.customerService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.customerService.findOne(name);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customerService.update(id, updateCustomerDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerService.delete(id);
  }
}
