import { Module } from '@nestjs/common';
import { CriticalInformationService } from './critical-information.service';
import { CriticalInformationController } from './critical-information.controller';

@Module({
  controllers: [CriticalInformationController],
  providers: [CriticalInformationService],
})
export class CriticalInformationModule {}
