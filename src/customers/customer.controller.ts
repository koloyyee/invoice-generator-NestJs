import {
    Body,
    Controller,
    Delete,
    ForbiddenException,
    Get,
    HttpCode,
    HttpException,
    HttpStatus,
    Param,
    Post,
    Put,
} from "@nestjs/common";
import { CustomerService } from "src/customers/customer.service";
import {
    CreateCustomerDto,
    UpdateCustomerDto,
} from "src/customers/dto/customer.dto";
import { Customer } from "src/customers/interfaces/customer.interface";

@Controller("customers")
export class CustomerController {
    constructor(private customerService: CustomerService) { }

    @Get()
    async findAll(): Promise<Customer[]> {
        try {
            return this.customerService.findAll();
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.FORBIDDEN,
                    error: "This is a custom message",
                },
                HttpStatus.FORBIDDEN,
                {
                    cause: error,
                },
            );
        }
    }

    @Get(":id")
    @HttpCode(200)
    findOne(@Param("id") id: string): string {
        return `Find all customers with id: ${id}`;
    }

    @Post()
    async create(@Body() createCustomerDto: CreateCustomerDto) {
        // this.customerService.create(createCustomerDto);
        throw new ForbiddenException();
    }

    @Put(":id")
    update(
        @Param("id") id: string,
        @Body() updateCustomerDto: UpdateCustomerDto,
    ) {
        return `update ${id} with ${updateCustomerDto}`;
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return `This action removes a #${id} cat`;
    }
}
