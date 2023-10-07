import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

class BillingAddress {
  @Prop()
  street: string;

  @Prop()
  province: string;

  @Prop()
  municipality: string;
}

@Schema()
export class Customer extends Document {
  @Prop()
  name: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop()
  status: string;

  @Prop({ type: BillingAddress })
  billingAddress: BillingAddress;

  @Prop()
  refresh_token: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Products' }] })
  favorite_products: Types.ObjectId[];
}
export const CustomerSchema = SchemaFactory.createForClass(Customer);