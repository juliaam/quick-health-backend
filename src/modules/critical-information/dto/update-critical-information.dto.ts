import { PartialType } from '@nestjs/mapped-types';
import { CreateCriticalInformationDto } from './create-critical-information.dto';

export class UpdateCriticalInformationDto extends PartialType(CreateCriticalInformationDto) {}
