import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // CREATE - Membuat user baru
  async create(createUserDto: CreateUserDto) {
    return await this.prisma.user.create({
      data: {
        username: createUserDto.username,
        email: createUserDto.email,
        password: createUserDto.password,
        full_name: createUserDto.full_name,
        phone: createUserDto.phone,
        address: createUserDto.address,
        userRoleId: createUserDto.userRoleId,
      },
    });
  }

  // READ ALL - Mendapatkan semua user
  async findAll() {
    return await this.prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        full_name: true,
        phone: true,
        address: true,
        userRoleId: true,
      },
    });
  }

  // READ ONE - Mendapatkan user berdasarkan ID
  async findOne(id: string) {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }

  // READ ONE - Mendapatkan user berdasarkan email
  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  // UPDATE - Mengupdate user
  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  // DELETE - Menghapus user
  async remove(id: string) {
    return await this.prisma.user.delete({
      where: { id },
    });
  }
}
