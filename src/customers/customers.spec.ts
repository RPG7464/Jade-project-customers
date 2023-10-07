import { Test, TestingModule } from '@nestjs/testing';
import { Customers } from './customers';

describe('Customers', () => {
  let provider: Customers;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Customers],
    }).compile();

    provider = module.get<Customers>(Customers);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
