import { Controller, Post, Param, Delete, Query } from '@nestjs/common';
import { QrCodeService } from './qr-code.service';

@Controller('qr-code')
export class QrCodeController {
  constructor(private readonly qrCodeService: QrCodeService) {}

  @Post()
  create(@Query('clinical_information_id') clinical_information_id: string) {
    return this.qrCodeService.create(+clinical_information_id);
  }

  @Post('acess-key/:id')
  createGenerateKey(@Param('id') id: string) {
    return this.qrCodeService.generateAcessKey(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.qrCodeService.remove(+id);
  }
}
