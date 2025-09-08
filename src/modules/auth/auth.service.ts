/* eslint-disable @typescript-eslint/no-misused-promises */

import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
import { comparePassword, hashPassword } from '../../helpers/encrypt';
import { EmailService } from '../email/email.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwt: JwtService,
    private readonly emailService: EmailService,
  ) {}

  async register(user: CreateUserDto) {
    const userExists = await this.userService.findOne({ email: user.email });

    if (userExists)
      throw new ConflictException('Já existe um usuário com esse email!');

    const newUser = await this.userService.create(user);

    const payload = {
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

    if (!findedUser) throw new NotFoundException('User not found');

    if (!comparePassword(user.password, findedUser.password))
      throw new UnauthorizedException('Invalid password');

    const payload = {
      email: findedUser.email,
      name: findedUser.name,
    };

    return { payload, access_token: await this.jwt.signAsync(payload) };
  }

  public async sendResetPasswordLink(email: string): Promise<void> {
    const user = await this.userService.findOne({ email });
    if (!user) throw new NotFoundException('Usuário não encontrado');

    const payload = { email };
    const token = this.jwt.sign(payload, {
      secret: process.env.SECRET,
      expiresIn: '15m',
    });

    await this.emailService.sendResetPasswordEmail(email, token);
  }

  public async resetPassword(
    token: string,
    newPassword: string,
  ): Promise<void> {
    try {
      const payload = this.jwt.verify<{ email: string }>(token, {
        secret: process.env.SECRET,
      });

      const user = await this.userService.findOne({ email: payload.email });
      if (!user) throw new NotFoundException('Usuário não encontrado');

      const hashedPassword = await hashPassword(newPassword);
      await this.userService.update(+user.user_id, {
        password: hashedPassword,
      });
    } catch {
      throw new UnauthorizedException('Token inválido ou expirado');
    }
  }
}
