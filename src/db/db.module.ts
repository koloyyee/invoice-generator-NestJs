import { Module } from '@nestjs/common';
import { Db, MongoClient } from 'mongodb';

@Module({
  providers: [
    {
      provide: 'DATABASE_CONNECTION',
      useFactory: async (): Promise<Db> => {
        try {
          const client = await MongoClient.connect(process.env.DB_CONN_STRING);
          return client.db(process.env.DB_NAME);
        } catch (error) {
          throw error;
        }
      },
    },
  ],
  exports: ['DATABASE_CONNECTION'],
})
export class DbModule {}
