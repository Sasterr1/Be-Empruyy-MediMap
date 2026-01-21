import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login';
import { RegisterDto } from './dto/register';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new BadRequestException('Email already registered');
    }

    const role = await this.prisma.user_role.findFirst({
      where: { roleName: 'USER' },
    });

    if (!role) {
      throw new BadRequestException('Role USER not found');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        username: dto.username,
        email: dto.email,
        password: hashedPassword,
        full_name: dto.full_name,
        phone: dto.phone,
        address: dto.address,
        userRoleId: role.id,
      },
    });

    return {
      message: 'Register success',
      userId: user.id,
    };
  }

async login(email: string, password: string) {
  const user = await this.prisma.user.findUnique({
    where: { email },
    include: { role: true },
  });

  if (!user) {
    throw new UnauthorizedException('Invalid email or password');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new UnauthorizedException('Invalid email or password');
  }

  const payload = {
    sub: user.id,
    role: user.role.roleName,
    email: user.email,
  };

  return {
    token: this.jwtService.sign(payload), // ⬅️ FIX PENTING
    role: user.role.roleName,
  };
}
}
