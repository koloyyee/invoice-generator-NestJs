import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {
    ICustomer,
    IInvoice,
    IIssuer,
} from 'src/invoices/interfaces/invoice.interface';

export type InvoiceDocument = HydratedDocument<IInvoice>;

@Schema()
class Issuer {
    @Prop({ required: true })
    username: string;

    @Prop({ required: true })
    address: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    website: string;

    @Prop({ required: true })
    bankName: string;

    @Prop({ required: true })
    bankAccount: string;

    @Prop({ required: true })
    bankHolder: string;
}
export const IssuerSchema = SchemaFactory.createForClass(Issuer);

@Schema()
class Customer {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    address: string;
}
export const CustomerSchema = SchemaFactory.createForClass(Customer);

@Schema()
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

    @Prop({ type: IssuerSchema })
    issuer: IIssuer;

    @Prop({ type: CustomerSchema })
    client: ICustomer;

    @Prop({ type: [ItemSchema] })
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
