import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendResetPasswordEmail(to: string, token: string) {
    const url = `${process.env.EMAIL_RESET_PASSWORD_URL}?token=${token}`;

    await this.mailerService.sendMail({
      to,
      subject: 'Redefinição de senha',
      html: `<p>Clique no link para redefinir sua senha: <a href="${url}">Redefinir Senha</a></p>`,
    });
  }
}
