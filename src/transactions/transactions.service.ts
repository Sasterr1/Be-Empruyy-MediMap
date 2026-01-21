import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { transaction_status } from '@prisma/client';

@Injectable()
export class TransactionsService {
  constructor(private readonly prisma: PrismaService) {}

async create(dto: CreateTransactionDto, userId: string) {
  return this.prisma.transactions.create({
    data: {
      userId,
      pharmacyId: dto.pharmacyId,
      paymentMethod: dto.paymentMethod, // pastikan enum cocok
      status: transaction_status.PENDING,
      totalAmount: 0, // ✅ WAJIB
      items: {
        create: dto.items.map((item) => ({
          medicineId: item.medicineId,
          quantity: item.quantity,
          price: 0, // nanti ambil dari DB
        })),
      },
    },
  });
}
}
