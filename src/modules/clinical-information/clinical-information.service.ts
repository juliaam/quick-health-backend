import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma-service';
import { UserService } from '../user/user.service';
import { CreateClinicalInformationDto } from './dto/create-clinical-information.dto';
import { UpdateClinicalInformationDto } from './dto/update-clinical-information.dto';

@Injectable()
export class ClinicalInformationService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
  ) {}
  async create(
    user_id: number,
    createClinicalInformationDto: CreateClinicalInformationDto,
  ) {
    const user = await this.userService.findOne({ where: { user_id } });

    if (!user) throw new NotFoundException('Usuário não encontrado!');

    return this.prisma.clinical_information.create({
      data: {
        ...createClinicalInformationDto,
        created_at: new Date(),
        user: {
          connect: { user_id },
        },
      },
    });
  }

  async getByAcessKey(id: number, acess_key: string) {
    const clinical_information =
      await this.prisma.clinical_information.findFirst({
        where: {
          clinical_information_id: id,
          qr_code: {
            acess_key,
          },
        },
      });

    console.log(clinical_information, 'clinical');

    if (!clinical_information)
      throw new NotFoundException(
        'Informação crítica não encontrada ou chave errada!',
      );

    return clinical_information;
  }

  async findOne(id: number) {
    const clinical_information =
      await this.prisma.clinical_information.findFirst({
        where: {
          clinical_information_id: id,
        },
      });

    if (!clinical_information)
      throw new NotFoundException('Informação crítica não encontrada');

    return clinical_information;
  }

  async update(
    id: number,
    user_id: number,
    { name, ...updateDto }: UpdateClinicalInformationDto,
  ) {
    await this.userService.update(user_id, { name });
    return this.prisma.clinical_information.update({
      where: {
        clinical_information_id: id,
      },
      data: updateDto,
    });
  }

  remove(id: number) {
    return this.prisma.clinical_information.delete({
      where: {
        clinical_information_id: id,
      },
    });
  }
}
