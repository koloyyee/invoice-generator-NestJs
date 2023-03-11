import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { CreateInvoiceDto, UpdateInvoiceDto } from './dto/invoice.dto';
import { InvoicesService } from './invoices.service';

@Controller('invoices')
export class InvoicesController {
  constructor(private invoicesService: InvoicesService) {}

  @Get()
  async findAll() {
    try {
      const invoices = this.invoicesService.findAll();
      return invoices;
    } catch (error) {
      return error.message;
    }
  }

  @Get('/status')
  async findAllStatus() {
    try {
      const invoicesStatus = this.invoicesService.findAllStatus();
      return invoicesStatus;
    } catch (error) {
      return error.message;
    }
  }

  @Get(':invoiceId')
  async findOne(@Param() params) {
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
      const issuer_id = new ObjectId(createInvoiceDto.issuer);
      createInvoiceDto['issuer_id'];
      const body = {
        ...createInvoiceDto,
        issuer: {
          _id: issuer_id,
        },
      };

      console.log(body);

      return this.invoicesService.create(body);
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
