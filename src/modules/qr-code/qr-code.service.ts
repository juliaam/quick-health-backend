import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma-service';
import qrcode from 'qrcode';
import { generateSecureKey } from 'src/helpers/generateRandomKey';

@Injectable()
export class QrCodeService {
  constructor(private prismaService: PrismaService) {}
  async create(clinical_information_id: number) {
    try {
      const linkBase = `${process.env.UI_URL}clinical-information?clinical_information_id=${clinical_information_id}`;
      const urlBase64 = await qrcode.toDataURL(linkBase);

      return await this.prismaService.qr_code.create({
        data: {
          base64: urlBase64,
          clinical_information: {
            connect: {
              clinical_information_id: clinical_information_id,
            },
          },
        },
      });
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Houve um erro ao gerar QR Code!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  generateAcessKey(id: number) {
    const acess_key = generateSecureKey();

    return this.prismaService.qr_code.update({
      where: {
        id_qr_code: id,
      },
      data: { acess_key },
    });
  }

  remove(id: number) {
    return this.prismaService.qr_code.delete({
      where: {
        id_qr_code: id,
      },
    });
  }
}
