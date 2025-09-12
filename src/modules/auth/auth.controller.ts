import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { SkipAuth } from './auth.decorator';
import { ResetPasswordDto } from '../email/dto/reset-password.dto';
import { ForgotPasswordDto } from '../email/dto/forgot-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @SkipAuth()
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @SkipAuth()
  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('validate-token')
  validateToken() {
    return {
      message: 'Token is valid',
      sucess: true,
    };
  }

  @SkipAuth()
  @Post('forgot-password')
  forgotPassword(@Body() { email }: ForgotPasswordDto): Promise<void> {
    return this.authService.sendResetPasswordLink(email);
  }

  @Post('reset-password')
  resetPassword(
    @Body() { newPassword, token }: ResetPasswordDto,
  ): Promise<void> {
    return this.authService.resetPassword(token, newPassword);
  }
}
