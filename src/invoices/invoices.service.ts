import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Invoice, InvoiceDocument } from 'src/invoices/schema/invoice.schema';
import { CreateInvoiceDto, UpdateInvoiceDto } from './dto/invoice.dto';
import { IInvoice } from './interfaces/invoice.interface';

@Injectable()
export class InvoicesService {
    constructor(
        @InjectModel(Invoice.name) private invoiceModel: Model<InvoiceDocument>
    ) {}

    async create(createInvoiceDto: CreateInvoiceDto): Promise<IInvoice> {
        const createInvoice = await this.invoiceModel.create(createInvoiceDto);
        return createInvoice;
    }

    async findAll(): Promise<IInvoice[]> {
        const invoices = await this.invoiceModel.find().exec();
        return invoices;
    }

    async findOne(invoiceId: string): Promise<IInvoice> {
        const invoice = await this.invoiceModel
            .findOne({ invoiceId: invoiceId })
            .exec();
        return invoice;
    }

    async updateOne(
        invoiceId: string,
        updateInvoiceDto: UpdateInvoiceDto
    ): Promise<unknown> {
        const result = await this.invoiceModel.findOneAndUpdate(
            { invoiceId: invoiceId },
            updateInvoiceDto,
            function (err, doc) {
                if (err) return console.log(err.message);
                return `success updated invoice.`;
            }
        );
        return result;
    }


    async deleteOne(invoiceId: string) {
        const result = await this.invoiceModel.deleteOne({
            invoiceId: invoiceId,
        });
        return result;
    }

    async countStatus(): Promise<number> {
        const paidCount = await this.invoiceModel.aggregate([
            { $match: { status: 'Paid' } },
        ]);
        return paidCount.length;
    }
}
