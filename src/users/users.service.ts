import { Inject, Injectable } from '@nestjs/common';
import { Db } from 'mongodb';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(@Inject('DATABASE_CONNECTION') private db: Db) {}

  async create(createUserDto: CreateUserDto) {
    const collection = this.db.collection('users');
    const user = await collection.findOne({ filter: createUserDto.name });
    if (user) throw `User existed.`;

    const result = await collection.insertOne(createUserDto);
    return result;
  }

  async findAll() {
    return await this.db.collection('users').find().toArray();
  }

  async findOne(filter: object) {
    const collection = this.db.collection('users');
    const user = await collection.findOne(filter);
    return user;
  }

  async findOneById(userId: string) {
    const collection = this.db.collection('users');
    const user = await collection.findOne({ id: userId });
    return user;
  }

  async update(userId: string, updateUserDto: UpdateUserDto) {
    const collection = this.db.collection('users');
    const result = await collection.updateOne(
      { id: userId },
      { $set: updateUserDto }
    );
    return result;
  }
  async deleteOne(userId: string): Promise<any> {
    const collection = this.db.collection('users');
    const result = await collection.deleteOne({ id: userId });
    return result;
  }
}
