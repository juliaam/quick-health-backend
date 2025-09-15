import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Post,
  Delete,
  Req,
} from '@nestjs/common';
import { ClinicalInformationService } from './clinical-information.service';
import { CreateClinicalInformationDto } from './dto/create-clinical-information.dto';
import { UpdateClinicalInformationDto } from './dto/update-clinical-information.dto';

@Controller('clinical-information')
export class CriticalInformationController {
  constructor(
    private readonly clinicalInformationService: ClinicalInformationService,
  ) {}

  @Post()
  create(
    @Body() createClinicalInformationDto: CreateClinicalInformationDto,
    @Req() request: any,
  ) {
    return this.clinicalInformationService.create(
      request.user.user_id,
      createClinicalInformationDto,
    );
  }

  @Get(':id/:accessKey')
  getByAccessKey(
    @Param('accessKey') accessKey: string,
    @Param('id') id: string,
  ) {
    console.log('bateu aqui');
    return this.clinicalInformationService.getByAcessKey(+id, accessKey);
  }

  @Get()
  findOne(@Req() request: any) {
    return this.clinicalInformationService.findOne(request.user.user_id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateClinicalInformationDto: UpdateClinicalInformationDto,
    @Req() request: any,
  ) {
    return this.clinicalInformationService.update(
      +id,
      request.user.user_id,
      updateClinicalInformationDto,
    );
  }

  @Delete(':user_id')
  delete(@Param('user_id') user_id: string) {
    return this.clinicalInformationService.remove(+user_id);
  }
}
