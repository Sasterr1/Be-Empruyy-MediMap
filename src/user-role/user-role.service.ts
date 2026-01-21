import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';

@Injectable()
export class UserRoleService {
  constructor(private prisma: PrismaService) {}

  create(createUserRoleDto: CreateUserRoleDto) {
    return this.prisma.user_role.create({
      data: createUserRoleDto,
    });
  }

  findAll() {
    return this.prisma.user_role.findMany({
      include: {
        users: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.user_role.findUnique({
      where: { id },
      include: {
        users: true,
      },
    });
  }

  update(id: string, updateUserRoleDto: UpdateUserRoleDto) {
    return this.prisma.user_role.update({
      where: { id },
      data: updateUserRoleDto,
    });
  }

  remove(id: string) {
    return this.prisma.user_role.delete({
      where: { id },
    });
  }
}
