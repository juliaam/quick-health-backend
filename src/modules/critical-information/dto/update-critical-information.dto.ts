import { IsString } from 'class-validator';

export class UpdateCriticalInformationDto {
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
  alergy: string;

  @IsString()
  medicines_used: string;

  @IsString()
  illness: string;

  @IsString()
  surgery: string;
}
