import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Invoice, invoiceSchema } from 'src/invoices/schema/invoice.schema';
import { StatusController } from './status.controller';
import { StatusService } from './status.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Invoice.name,
                schema: invoiceSchema,
            },
        ]),
    ],
    controllers: [StatusController],
    providers: [StatusService],
})
export class StatusModule {}
