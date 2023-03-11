import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IInvoice } from 'invoices/interfaces/invoice.interface';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

export type InvoiceDocument = HydratedDocument<IInvoice>;

@Schema({ _id: false })
export class Issuer {
  @Prop({ type: SchemaTypes.ObjectId, required: true })
  _id: Types.ObjectId;
}
export const IssuerSchema = SchemaFactory.createForClass(Issuer);

@Schema()
class Customer {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: string;
}
export const CustomerSchema = SchemaFactory.createForClass(Customer);

@Schema({ _id: false })
class Item {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  subtotal: number;
}
export const ItemSchema = SchemaFactory.createForClass(Item);

enum InvoiceStatus {
  NOT_PAID = 'Not Paid',
  PAID = 'Paid',
  ACTIVE = 'Active',
  VOID = 'Void',
}

@Schema()
export class Invoice {
  @Prop()
  invoiceId: string;

  @Prop()
  createdDate: string;

  @Prop()
  dueDate: string;

  @Prop({ type: IssuerSchema, require: true })
  issuer: Issuer;

  @Prop({ type: CustomerSchema })
  customer: Customer;

  @Prop()
  items: Item[];

  @Prop()
  note: string;

  @Prop()
  totalAmount: number;

  @Prop({
    type: String,
    enum: InvoiceStatus,
    default: InvoiceStatus.NOT_PAID,
  })
  status: InvoiceStatus;
}
export const invoiceSchema = SchemaFactory.createForClass(Invoice);
