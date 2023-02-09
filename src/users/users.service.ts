import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/schema/users.schema';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { IUser } from './interfaces/user.interface';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>
    ) {}

    async create(createUserDto: CreateUserDto): Promise<IUser> {
        const isUserExisted = await this.userModel
            .find({ filter: createUserDto.name })
            .exec();
        if (isUserExisted) throw `User existed.`;
        const result = await this.userModel.create(createUserDto);
        return result;
    }

    async findAll(): Promise<IUser[]> {
        const users = this.userModel.find().exec();

        return users;
    }

    /**
     * @param {string} filter: { field: "value"}
     * @returns {IUser}: user with correct username
     */
    async findOne(filter: object): Promise<IUser> {
        const user = await this.userModel.findOne(filter).exec();
        return user;
    }

    async findOneById(userId: string): Promise<IUser> {
        const user = await this.userModel.findOne({ id: userId }).exec();
        return user;
    }

    async updateOne(userId: string, updateUserDto: UpdateUserDto) {
        const result = await this.userModel.updateOne(
            { id: userId },
            updateUserDto
        );
        return result;
    }
    async deleteOne(userId: string): Promise<any> {
        const result = await this.userModel.deleteOne({ id: userId });
        return result;
    }
}
