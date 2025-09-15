import { PartialType } from '@nestjs/mapped-types';
import { CreateClinicalInformationDto } from './create-clinical-information.dto';

export class UpdateClinicalInformationDto extends PartialType(
  CreateClinicalInformationDto,
) {}
