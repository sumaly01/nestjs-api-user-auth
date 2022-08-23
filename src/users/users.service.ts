import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './user.model';

@Injectable()
export class UsersService {
  //'User' chai collection bhayo
  //mongoose creates constructor function
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async createUser(username: string, email: string, password: string) {
    const newUser = new this.userModel({ username, email, password });
    const user = await newUser.save();
    return user as User;
  }

  async getUsers() {
    const users = await this.userModel.find().exec();
    return users.map((user) => ({
      id: user.id,
      username: user.username,
      email: user.email,
      password: user.password,
    }));
  }

  async getUser(id: string) {
    let user;
    try {
      user = await this.userModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find user');
    }
    if (!user) {
      throw new NotFoundException('Could not find user');
    }
    return user;
  }

  async updateUser(
    userId: string,
    username: string,
    email: string,
    password: string,
  ) {
    const updatedUser = await this.getUser(userId);

    if (username) {
      updatedUser.username = username;
    }
    if (email) {
      updatedUser.email = email;
    }
    if (password) {
      updatedUser.password = password;
    }
    updatedUser.save();
    return updatedUser;
  }

  async deleteUser(id: string) {
    const user = await this.userModel.findOne({ _id: id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userModel.deleteOne({ _id: id }).exec();
    return user;
  }
}
