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
    username: string;
    address: string;
    email: string;
    website: string;
    bankName: string;
    bankAccount: string;
    bankHolder: string;
}

export interface ICustomer {
    name: string;
    address: string;
}

export interface IItem {
    name: string;
    price: number;
    quantity: number;
    subtotal: number;
}
