import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { InvoicesController } from './invoices.controller';
import { InvoicesService } from './invoices.service';
import { InvoiceDocument } from './schema/invoice.schema';

describe('InvoicesController', () => {
    let controller: InvoicesController;
    let service: InvoicesService;
    let model: Model<InvoiceDocument>;

    beforeEach(async () => {
        service = new InvoicesService(model);
        controller = new InvoicesController(service);

        const module: TestingModule = await Test.createTestingModule({
            controllers: [InvoicesController],
            providers: [InvoicesService],
        }).compile();

        service = module.get<InvoicesService>(InvoicesService);
        controller = module.get<InvoicesController>(InvoicesController);
    });
    describe('findAll', () => {
        it('should return an array of invoices.', async () => {
            const result: any = ['test'];
            jest.spyOn(service, 'findAll').mockImplementation(() => result);

            expect(await controller.findAll()).toBe(result);
        });
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
