import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCustomerDto } from './dto/customer.dto';
import { ICustomer } from './interfaces/customer.interface';
import { Customer, CustomerDocument } from './schema/customer.schema';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<CustomerDocument>
  ) {}

  async create(createCustomerDto: CreateCustomerDto) {
    const result = await this.customerModel.create(createCustomerDto);
    return result;
  }
  async findAll(): Promise<ICustomer[]> {
    const result: ICustomer[] = await this.customerModel.find().exec();
    return result;
  }
  async findOne(filter: object): Promise<ICustomer> {
    const customer: ICustomer = await this.customerModel.findOne(filter).exec();
    return customer;
  }
  async findSome(field: string, pattern: string): Promise<ICustomer[]> {
    const result = await this.customerModel
      .find(
        {
          [field]: { $regex: pattern },
        },
        function (err, docs) {
          return docs;
        }
      )
      .clone();
    console.log(result);
    return result;
  }
}
