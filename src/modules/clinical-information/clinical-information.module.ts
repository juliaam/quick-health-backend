import { Module } from '@nestjs/common';
import { ClinicalInformationService } from './clinical-information.service';
import { CriticalInformationController } from './clinical-information.controller';
import { UserService } from '../user/user.service';
import { PrismaService } from 'src/database/prisma-service';

@Module({
  controllers: [CriticalInformationController],
  providers: [ClinicalInformationService, PrismaService, UserService],
})
export class CriticalInformationModule {}
