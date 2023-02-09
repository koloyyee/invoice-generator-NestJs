import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Invoice, invoiceSchema } from 'src/invoices/schema/invoice.schema';
import { InvoicesController } from './invoices.controller';
import { InvoicesService } from './invoices.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Invoice.name,
                schema: invoiceSchema,
            },
        ]),
    ],
    controllers: [InvoicesController],
    providers: [InvoicesService],
})
export class InvoicesModule {}
