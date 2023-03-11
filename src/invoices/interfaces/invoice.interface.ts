import { ICustomer } from 'src/customers/interfaces/customer.interface';

export interface IInvoice {
  invoiceId?: string;
  invoiceDate: string;
  invoiceDueDate: string;
  issuer: IIssuer;
  client: ICustomer;
  items: IItem[];
  note?: string;
  totalAmount: number;
  status: string;
}

export interface IIssuer {
  _id: string;
  username: string;
  address: string;
  email: string;
  website: string;
  bankName: string;
  bankAccount: string;
  bankHolder: string;
}
export interface IItem {
  name: string;
  price: number;
  quantity: number;
  subtotal: number;
}
