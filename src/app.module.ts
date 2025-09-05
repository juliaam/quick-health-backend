import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './database/prisma-service';
import {
  AuthModule,
  CriticalInformationModule,
  UserModule,
} from './modules/modules';
import { UserService } from './modules/user/user.service';
import { AuthService } from './modules/auth/auth.service';

@Module({
  imports: [UserModule, CriticalInformationModule, AuthModule],
  providers: [AppService, PrismaService, UserService, AuthService],
})
export class AppModule {}
