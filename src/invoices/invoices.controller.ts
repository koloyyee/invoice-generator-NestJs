import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post
} from '@nestjs/common';
import { CreateInvoiceDto, UpdateInvoiceDto } from './dto/invoice.dto';
import { IInvoice } from './interfaces/invoice.interface';
import { InvoicesService } from './invoices.service';

@Controller('invoices')
export class InvoicesController {
    constructor(private invoicesService: InvoicesService) {}

    @Get()
    async findAll(): Promise<IInvoice[]> {
        try {
            const invoices = this.invoicesService.findAll();
            return invoices;
        } catch (error) {
            return error.message;
        }
    }

    @Get(':invoiceId')
    async findOne(@Param() params): Promise<IInvoice> {
        try {
            const invoice = this.invoicesService.findOne(params.invoiceId);
            return invoice;
        } catch (error) {
            return error.message;
        }
    }

    @Post()
    async create(@Body() createInvoiceDto: CreateInvoiceDto) {
        if (!createInvoiceDto) return;
        try {
            return this.invoicesService.create(createInvoiceDto);
        } catch (error) {
            return error.message;
        }
    }

    @Patch(':invoiceId')
    async update(@Param() params, @Body() updateInvoiceDto: UpdateInvoiceDto) {
        if (!updateInvoiceDto) return;

        try {
            const status = this.invoicesService.updateOne(
                params.invoiceId,
                updateInvoiceDto
            );
            return status;
        } catch (error) {
            return error.message;
        }
    }

    @Delete(':invoiceId')
    async delete(@Param() params) {
        try {
            const status = this.invoicesService.deleteOne(params.invoiceId);
            return status;
        } catch (error) {
            return error.message;
        }
    }
}
