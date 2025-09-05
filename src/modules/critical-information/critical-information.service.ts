import { Injectable } from '@nestjs/common';
import { CreateCriticalInformationDto } from './dto/create-critical-information.dto';
import { UpdateCriticalInformationDto } from './dto/update-critical-information.dto';

@Injectable()
export class CriticalInformationService {
  create(createCriticalInformationDto: CreateCriticalInformationDto) {
    return 'This action adds a new criticalInformation';
  }

  findAll() {
    return `This action returns all criticalInformation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} criticalInformation`;
  }

  update(id: number, updateCriticalInformationDto: UpdateCriticalInformationDto) {
    return `This action updates a #${id} criticalInformation`;
  }

  remove(id: number) {
    return `This action removes a #${id} criticalInformation`;
  }
}
