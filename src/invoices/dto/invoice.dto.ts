import { ICustomer, IIssuer, IItem } from '../interfaces/invoice.interface';

export class CreateInvoiceDto {
    invoiceId?: string;
    invoiceDate: string;
    invoiceDueDate: string;
    issuer: IIssuer;
    client: ICustomer;
    items: IItem[];
    note?: string;
    totalAmount: number;
}
export class UpdateInvoiceDto {
    invoiceId?: string;
    invoiceDate: string;
    invoiceDueDate: string;
    issuer: IIssuer;
    client: ICustomer;
    items: IItem[];
    note?: string;
    totalAmount: number;
}
