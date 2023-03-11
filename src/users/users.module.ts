import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    DbModule,
    // MongooseModule.forFeature([
    //   {
    //     name: User.name,
    //     schema: userSchema,
    //   },
    // ]),
  ],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
