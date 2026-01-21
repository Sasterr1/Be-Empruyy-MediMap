import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';

@Injectable()
export class MedicinesService {
  constructor(private prisma: PrismaService) {}

create(dto: CreateMedicineDto) {
  return this.prisma.medicine.create({
    data: {
      name: dto.name,
      category: dto.category,
      description: dto.description,
    },
  });
}
findAllForManage() {
  return this.prisma.medicine.findMany({
    include: {
      pharmacyMedicines: true,
      transactionItems: true,
    },
  });
}


findAll() {
  return this.prisma.medicine.findMany({
    select: {
      id: true,
      name: true,
      category: true,
      description: true,
      pharmacyMedicines: {
        select: {
          stock: true,
          price: true,
          pharmacy: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });
}


  findOne(id: string) {
    return this.prisma.medicine.findUnique({
      where: { id },
      include: {
        pharmacyMedicines: true,
        cartItems: true,
        transactionItems: true,
      },
    });
  }

  update(id: string, updateMedicineDto: UpdateMedicineDto) {
    return this.prisma.medicine.update({
      where: { id },
      data: updateMedicineDto,
      include: {
        pharmacyMedicines: true,
        cartItems: true,
        transactionItems: true,
      },
    });
  }

  remove(id: string) {
    return this.prisma.medicine.delete({
      where: { id },
    });
  }
}
