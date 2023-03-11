import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InvoiceDocument } from 'src/invoices/schema/invoice.schema';
import { Invoice } from '../invoices/schema/invoice.schema';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';

// TODOs:
// get all clients purchase history who has the most orders, purchase total amount
// get all invoice status count on paid, not paid, void
// get overdued invoices
//

@Injectable()
export class StatusService {
    constructor(
        @InjectModel(Invoice.name) private invoiceModel: Model<InvoiceDocument>
    ) {}

    create(createStatusDto: CreateStatusDto) {
        return 'This action adds a new status';
    }

    findInvoicesStatus() {
        const doc = this.invoiceModel.aggregate([
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 },
                },
            },
        ]);

        return doc;
    }

    async latePaymentClients(filter) {
        // business logic on
        // 1. client who's due date passed today.
        // 2. client name
        // 3. address
        // 4. totalAmount
        console.log(filter);
        return null;
    }

    async findTotalRevenue() {
        const revenue = await this.invoiceModel.aggregate();
    }

    update(id: number, updateStatusDto: UpdateStatusDto) {
        return `This action updates a #${id} status`;
    }

    remove(id: number) {
        return `This action removes a #${id} status`;
    }
}
