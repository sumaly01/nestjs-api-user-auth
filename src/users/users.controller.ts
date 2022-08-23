import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
// import { User } from './user.model';

@Controller('auth')
export class UsersController {
  constructor(public usersService: UsersService) {}

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto) {
    const user = await this.usersService.createUser(
      body.username,
      body.email,
      body.password,
    );
    return user;
  }

  @Get()
  async getUsers() {
    const users = await this.usersService.getUsers();
    return users;
  }

  @Get('/:id')
  async getUser(@Param('id') id: string) {
    const user = await this.usersService.getUser(id);
    return user;
  }

  @Patch('/:id')
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    const updatedUser = await this.usersService.updateUser(
      id,
      body.username,
      body.email,
      body.password,
    );
    return updatedUser;
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    const user = await this.usersService.deleteUser(id);
    return user;
  }
}
