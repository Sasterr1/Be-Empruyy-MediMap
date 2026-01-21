import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  // Cek bagian ini. Jika kamu punya constructor, pastikan super() dipanggil dengan benar
  constructor() {
    super({
      log: ['info', 'warn', 'error'], // Pastikan syntax ini benar jika ada
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
