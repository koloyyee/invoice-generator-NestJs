import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { IUser } from './interfaces/user.interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        try {
            if (!createUserDto) return;

            const saltOrRound = 10;
            const hashedPassword = await bcrypt.hash(
                createUserDto.password,
                saltOrRound
            );
            const body: CreateUserDto = {
                ...createUserDto,
                password: hashedPassword,
            };
            const result = this.usersService.create(body);
            return result;
        } catch (error) {
            return error.message;
        }
    }

    @Get(':username')
    async findOne(@Param() params): Promise<IUser> {
        try {
            const user = await this.usersService.findOne({
                username: params.username,
            });
            return user;
        } catch (error) {
            return error.message;
        }
    }

    @Get(':userId')
    async findOneById(@Param() params): Promise<IUser> {
        try {
            const user = this.usersService.findOneById(params.userId);
            return user;
        } catch (error) {
            return error.message;
        }
    }

    @Get('')
    async findAll(): Promise<IUser[]> {
        try {
            const users = await this.usersService.findAll();
            return users;
        } catch (error) {
            return error.message;
        }
    }

    @Patch(':userId')
    async updateOne(@Param() params, @Body() updateUserDto: UpdateUserDto) {
        try {
            if (!updateUserDto) return;

            const status = await this.usersService.updateOne(
                params.userId,
                updateUserDto
            );
            return status;
        } catch (error) {
            return error.message;
        }
    }

    @Delete(':userId')
    async deleteOne(@Param() params): Promise<void> {
        try {
            const status = await this.usersService.deleteOne(params.userId);
            return status;
        } catch (error) {
            return error.message;
        }
    }
}
