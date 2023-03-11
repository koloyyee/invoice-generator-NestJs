import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ICustomer } from '../interfaces/customer.interface';

export type CustomerDocument = HydratedDocument<ICustomer>;

@Schema()
export class Customer {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  phone: string;
}

export const customerSchema = SchemaFactory.createForClass(Customer);
