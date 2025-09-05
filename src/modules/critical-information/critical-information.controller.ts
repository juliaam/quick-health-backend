import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CriticalInformationService } from './critical-information.service';
import { CreateCriticalInformationDto } from './dto/create-critical-information.dto';
import { UpdateCriticalInformationDto } from './dto/update-critical-information.dto';

@Controller('critical-information')
export class CriticalInformationController {
  constructor(private readonly criticalInformationService: CriticalInformationService) {}

  @Post()
  create(@Body() createCriticalInformationDto: CreateCriticalInformationDto) {
    return this.criticalInformationService.create(createCriticalInformationDto);
  }

  @Get()
  findAll() {
    return this.criticalInformationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.criticalInformationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCriticalInformationDto: UpdateCriticalInformationDto) {
    return this.criticalInformationService.update(+id, updateCriticalInformationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.criticalInformationService.remove(+id);
  }
}
