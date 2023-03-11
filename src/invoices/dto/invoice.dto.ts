import { ICustomer } from 'customers/interfaces/customer.interface';
import { IItem } from '../interfaces/invoice.interface';
export class CreateInvoiceDto {
  invoiceId?: string;
  invoiceDate: string;
  invoiceDueDate: string;
  issuer: string;
  customer: ICustomer;
  items: IItem[];
  note?: string;
  totalAmount: number;
}
export class UpdateInvoiceDto {
  invoiceId?: string;
  invoiceDate: string;
  invoiceDueDate: string;
  issuer: string;
  customer: ICustomer;
  items: IItem[];
  note?: string;
  totalAmount: number;
}
