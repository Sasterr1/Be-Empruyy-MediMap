import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // ADMIN: manajemen user
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  findAll() {
    return this.userService.findAll();
  }

  // USER: dashboard sendiri
  @Get('dashboard')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('USER')
  getDashboard(@Req() req) {
    return {
      message: 'Dashboard User',
      user: req.user,
    };
  }
}
