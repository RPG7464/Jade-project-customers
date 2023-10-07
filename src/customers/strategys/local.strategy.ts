import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CustomersService } from '../customers.service'; 
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private customerService: CustomersService) {
    super();
  }

  async validate(email: string, password: string): Promise<any> {
    const costumer = await this.customerService.validate(email, password);
    if (!costumer) {
      throw new UnauthorizedException('Email or user are incorrects');
    }
    return costumer;
  }
}
