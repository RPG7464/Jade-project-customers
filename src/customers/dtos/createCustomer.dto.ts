import { IsEmail, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsStrongPassword } from 'class-validator';


class CreateBillingAddressDto {
  @IsString()
  readonly street: string;
  
  @IsString()
  readonly province: string;
  
  @IsString()
  readonly municipality: string;
}


export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
  
  @IsStrongPassword()
  readonly password: string;
  
  @IsString()
  @IsNotEmpty()
  readonly status: string;

  @Type(() => CreateBillingAddressDto)
  readonly billingAddress: CreateBillingAddressDto;

  @IsString()
  @IsNotEmpty()
  readonly refresh_token: string;
}

