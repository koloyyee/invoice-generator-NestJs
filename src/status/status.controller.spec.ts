import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { connect, Connection, Model } from 'mongoose';
import {
  Invoice,
  InvoiceDocument,
  invoiceSchema
} from 'src/invoices/schema/invoice.schema';
import { StatusController } from './status.controller';
import { StatusService } from './status.service';

describe('StatusController', () => {
    let controller: StatusController;
    let mongodb: MongoMemoryServer;
    let mongoConnection: Connection;
    let model: Model<InvoiceDocument>;

    beforeAll(async () => {
        mongodb = await MongoMemoryServer.create();
        const uri = mongodb.getUri();
        mongoConnection = (await connect(uri)).connection;
        model = mongoConnection.model(Invoice.name, invoiceSchema);

        const module: TestingModule = await Test.createTestingModule({
            controllers: [StatusController],
            providers: [
                StatusService,
                {
                    provide: getModelToken(Invoice.name),
                    useValue: model,
                },
            ],
        }).compile();
        controller = module.get<StatusController>(StatusController);
    });

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [StatusController],
            providers: [StatusService],
        }).compile();
        controller = module.get<StatusController>(StatusController);
    });

    // describe('latePaymentClients', () => {
    //     it('should return all clients name with late payment ', async () => {
    //         const result = [
    //             {
    //                 name: 'test2',
    //                 address: 'test2',
    //                 invoiceDueDate: '22/1/2023',
    //                 totalAmount: 300,
    //                 invoiceId: '1674380428989',
    //             },
    //         ];

    //         jest.spyOn(service, 'latePaymentClients').mockImplementation(
    //             async () => result
    //         );
    //         expect(await service.latePaymentClients()).toContain(result);
    //     });
    // });
});
