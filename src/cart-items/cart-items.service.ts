import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';

@Injectable()
export class CartItemsService {
  constructor(private prisma: PrismaService) {}

  create(createCartItemDto: CreateCartItemDto) {
    return this.prisma.cart_items.create({
      data: createCartItemDto,
      include: {
        cart: true,
        medicine: true,
      },
    });
  }

  findAll() {
    return this.prisma.cart_items.findMany({
      include: {
        cart: true,
        medicine: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.cart_items.findUnique({
      where: { id },
      include: {
        cart: true,
        medicine: true,
      },
    });
  }

  findByCart(cartId: string) {
    return this.prisma.cart_items.findMany({
      where: { cartId },
      include: {
        cart: true,
        medicine: true,
      },
    });
  }

  update(id: string, updateCartItemDto: UpdateCartItemDto) {
    return this.prisma.cart_items.update({
      where: { id },
      data: updateCartItemDto,
      include: {
        cart: true,
        medicine: true,
      },
    });
  }

  remove(id: string) {
    return this.prisma.cart_items.delete({
      where: { id },
    });
  }
}
