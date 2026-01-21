import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login';
import { RegisterDto } from './dto/register';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // REGISTER → role otomatis USER
  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  // LOGIN → JWT disimpan di cookie
  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { token, role } = await this.authService.login(
      dto.email,
      dto.password,
    );

    res.cookie('access_token', token, {
      httpOnly: true,
      secure: false, // true jika sudah HTTPS (production)
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24, // 1 hari
    });

    return {
      message: 'Login berhasil',
      role,
    };
  }

  // LOGOUT → hapus cookie
  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token');
    return { message: 'Logout berhasil' };
  }
}
