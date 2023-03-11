import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { StatusService } from './status.service';

@Controller('status')
export class StatusController {
    constructor(private readonly statusService: StatusService) {}

    @Post()
    create(@Body() createStatusDto: CreateStatusDto) {
        return this.statusService.create(createStatusDto);
    }

    @Get(':filter')
    findClients(@Param() param) {
        const filter = new URLSearchParams(param.filter);
        const query = {};

        for (const [key, value] of filter.entries()) {
            const obj = {};
            obj[key] = value;
            Object.assign(query, obj);
        }

        return this.statusService.latePaymentClients(query);
    }

    @Get('revenue')
    async findTotalRevenue() {
        const revenue = await this.statusService.findTotalRevenue();
        return revenue;
    }

    @Get()
    async findInvoicesStatus() {
        return await this.statusService.findInvoicesStatus();
    }
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateStatusDto: UpdateStatusDto) {
        return this.statusService.update(+id, updateStatusDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.statusService.remove(+id);
    }
}
