import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CustomerService } from 'customers/customer.service';
import {
  CreateCustomerDto,
  UpdateCustomerDto,
} from 'customers/dto/customer.dto';
import { ICustomer } from 'customers/interfaces/customer.interface';

@Controller('customers')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Get('all')
  async findAll(): Promise<ICustomer[]> {
    try {
      return this.customerService.findAll();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'This is a custom message',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        }
      );
    }
  }

  @Get()
  @HttpCode(200)
  async findOne(@Query() query) {
    const queryObj = new URLSearchParams(query);

    let field = '';
    let pattern = '';
    for (const [key, value] of queryObj) {
      field = key;
      pattern = value;
    }
    try {
      const customers = await this.customerService.findSome(field, pattern);
      console.log(customers);
      return customers;
    } catch (error) {
      console.error(error.message);
      return error;
    }
  }

  @Post()
  async create(@Body() createCustomerDto: CreateCustomerDto) {
    try {
      return await this.customerService.create(createCustomerDto);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: error.errmsg,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: error.errmsg,
        }
      );
    }
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto
  ) {
    return `update ${id} with ${updateCustomerDto}`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}
