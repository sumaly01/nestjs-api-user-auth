import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(username: string, email: string, password: string) {
    //see if email is in use
    const users = await this.usersService.getUsers();
    users.forEach((user) => {
      if (user.email === email) {
        throw new BadRequestException('Email already used');
      }
    });
    //hash the users password
    //generate a salt
    const salt = randomBytes(8).toString('hex');
    //hash the salt and password togethr
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    //join the hashed result and salt together
    const result = salt + '.' + hash.toString('hex');
    //create a new user and save it
    const user = await this.usersService.createUser(username, email, result);
    //return the user
    return user;
  }

  async signin(email: string, password: string) {
    const users = await this.usersService.getUsers();
    const user = users.find((userOne) => {
      return userOne.email === email;
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('Wrong password');
    }
    return user;
  }
}
