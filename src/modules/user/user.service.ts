import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

import { UpdateUserDto } from './dto/update-user.dto';

import { PrismaService } from 'src/database/prisma-service';
import { Prisma } from '@prisma/client';
import { hashPassword } from 'src/helpers/encrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(user: CreateUserDto) {
    user.password = await hashPassword(user.password);

    return this.prisma.user.create({
      data: user,
    });
  }

  findAll() {
    return this.prisma.user.findMany({
      omit: {
        password: true,
      },
    });
  }

  async findOne(findFirst: Prisma.userFindFirstArgs) {
    return await this.prisma.user.findFirst(findFirst);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: {
        user_id: id,
      },

      data: updateUserDto,
    });
  }

  remove(id: number) {
    return this.prisma.user.delete({
      where: {
        user_id: id,
      },
    });
  }
}
