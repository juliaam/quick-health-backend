/* eslint-disable @typescript-eslint/no-misused-promises */

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
import { comparePassword } from '../../helpers/encrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwt: JwtService,
  ) {}
  async register(user: CreateUserDto) {
    const newUser = await this.userService.create(user);

    const payload = {
      sub: newUser.user_id,
      email: newUser.email,
      name: newUser.name,
    };

    return {
      payload,
      access_token: await this.jwt.signAsync(payload),
    };
  }

  async login(user: LoginUserDto) {
    const findedUser = await this.userService.findOne({ email: user.email });

    if (!findedUser)
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    if (!comparePassword(user.password, findedUser.password))
      throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);

    const payload = {
      sub: findedUser.user_id,
      email: findedUser.email,
      name: findedUser.name,
    };

    return { payload, access_token: await this.jwt.signAsync(payload) };
  }
}
