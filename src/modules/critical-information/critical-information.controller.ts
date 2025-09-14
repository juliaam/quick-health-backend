import { Controller, Get, Body, Patch, Param } from '@nestjs/common';
import { CriticalInformationService } from './critical-information.service';
import { UpdateCriticalInformationDto } from './dto/update-critical-information.dto';

@Controller('critical-information')
export class CriticalInformationController {
  constructor(
    private readonly criticalInformationService: CriticalInformationService,
  ) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.criticalInformationService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCriticalInformationDto: UpdateCriticalInformationDto,
  ) {
    return this.criticalInformationService.update(
      +id,
      updateCriticalInformationDto,
    );
  }
}
