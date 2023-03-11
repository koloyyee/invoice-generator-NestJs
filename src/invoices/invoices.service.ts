import { Inject, Injectable } from '@nestjs/common';
import { Db } from 'mongodb';
import { UpdateInvoiceDto } from './dto/invoice.dto';

@Injectable()
export class InvoicesService {
  constructor(@Inject('DATABASE_CONNECTION') private db: Db) {}

  async create(createInvoiceDto: any) {
    const collection = this.db.collection('invoices');
    const createInvoice = await collection.insertOne(createInvoiceDto);

    return createInvoice;
  }

  async findAll() {
    const collection = this.db.collection('invoices');
    const invoices = await collection.find().toArray();
    return invoices;
  }

  async findAllStatus() {
    const collection = this.db.collection('invoices');
    const doc = await collection
      .aggregate([
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 },
          },
        },
      ])
      .toArray();

    return doc;
  }

  async findOne(invoiceId: string) {
    const collection = this.db.collection('invoices');
    const invoice = await collection.findOne({ invoiceId: invoiceId });
    return invoice;
  }

  async updateOne(
    invoiceId: string,
    updateInvoiceDto: UpdateInvoiceDto
  ): Promise<unknown> {
    const collection = this.db.collection('invoices');
    const result = await collection.findOneAndUpdate(
      { invoiceId: invoiceId },
      { $set: updateInvoiceDto }
    );
    return result;
  }

  async deleteOne(invoiceId: string) {
    const collection = this.db.collection('invoices');
    const result = await collection.deleteOne({
      invoiceId: invoiceId,
    });
    return result;
  }

  async countStatus() {
    const collection = this.db.collection('invoices');
    const paidCount = await collection
      .aggregate([{ $match: { status: 'Paid' } }])
      .toArray();
    console.log(paidCount);
    return paidCount.length;
  }
}
