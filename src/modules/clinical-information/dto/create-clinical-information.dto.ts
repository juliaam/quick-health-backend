import { IsString } from 'class-validator';

export class CreateClinicalInformationDto {
  @IsString()
  name: string;

  @IsString()
  last_name: string;

  @IsString()
  gender_sex: string;

  @IsString()
  emergency_contact: string;

  @IsString()
  blood_type: string;

  @IsString()
  allergy: string;

  @IsString()
  medicines_used: string;

  @IsString()
  illness: string;

  @IsString()
  surgery: string;
}
