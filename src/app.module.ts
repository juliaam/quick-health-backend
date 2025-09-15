import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './database/prisma-service';
import {
  AuthModule,
  CriticalInformationModule,
  UserModule,
} from './modules/modules';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './modules/auth/auth.guard';
import { EmailModule } from './modules/email/email.module';
import { QrCodeModule } from './modules/qr-code/qr-code.module';

@Module({
  imports: [
    UserModule,
    CriticalInformationModule,
    AuthModule,
    EmailModule,
    QrCodeModule,
  ],
  providers: [
    AppService,
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
