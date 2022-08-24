import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Patch,
  Delete,
  // UseInterceptors,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
// import { User } from './user.model';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';

@Controller('auth')
@Serialize(UserDto) //so that it works for all routes
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

  // @UseInterceptors(new SerializeInterceptor(UserDto))
  // @Serialize(UserDto)
  @Get('/:id')
  async getUser(@Param('id') id: string) {
    // console.log('handler');
    const user = await this.usersService.getUser(id);
    return user;
  }

  @Patch('/:id')
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    const updatedUser = await this.usersService.updateUser(
      id,
      // body.username,
      // body.email,
      // body.password,
      body,
    );
    return updatedUser;
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    const user = await this.usersService.deleteUser(id);
    return user;
  }
}
