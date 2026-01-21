import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  create(createCartDto: CreateCartDto) {
    return this.prisma.cart.create({
      data: createCartDto,
      include: {
        user: true,
        items: {
          include: {
            medicine: true,
          },
        },
      },
    });
  }

  findAll() {
    return this.prisma.cart.findMany({
      include: {
        user: true,
        items: {
          include: {
            medicine: true,
          },
        },
      },
    });
  }

  findOne(id: string) {
    return this.prisma.cart.findUnique({
      where: { id },
      include: {
        user: true,
        items: {
          include: {
            medicine: true,
          },
        },
      },
    });
  }

  findByUserId(userId: string) {
    return this.prisma.cart.findFirst({
      where: { userId },
      include: {
        user: true,
        items: {
          include: {
            medicine: true,
          },
        },
      },
    });
  }

  update(id: string, updateCartDto: UpdateCartDto) {
    return this.prisma.cart.update({
      where: { id },
      data: updateCartDto,
      include: {
        user: true,
        items: {
          include: {
            medicine: true,
          },
        },
      },
    });
  }

  remove(id: string) {
    return this.prisma.cart.delete({
      where: { id },
    });
  }
}
