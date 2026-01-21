import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePharmacyDto } from './dto/create-pharmacies.dto';
import { UpdatePharmaciesDto } from './dto/update-pharmacies.dto';
import { NotFoundException } from '@nestjs/common';
@Injectable()
export class PharmaciesService {
  constructor(private prisma: PrismaService) {}

async create(dto: CreatePharmacyDto, userId: string) {
  return this.prisma.pharmacies.create({
    data: {
      userId,
      name: dto.name,
      address: dto.address,
      phone: dto.phone,
      latitude: dto.latitude,
      longitude: dto.longitude,
openTime: String(dto.openTime),
closeTime: String(dto.closeTime),
    },
  });
}

async getMedicinesByUser(userId: string) {
  const pharmacy = await this.prisma.pharmacies.findUnique({
    where: { userId },
  });

  if (!pharmacy) {
    throw new NotFoundException('Pharmacy not found');
  }

  return this.prisma.pharmacy_medicines.findMany({
    where: { pharmacyId: pharmacy.id },
    include: {
      medicine: true,
    },
  });
}


  findAll() {
    return this.prisma.pharmacies.findMany({
      include: {
        user: true,
        medicines: true,
        transactions: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.pharmacies.findUnique({
      where: { id },
      include: {
        user: true,
        medicines: true,
        transactions: true,
      },
    });
  }

  findByUserId(userId: string) {
    return this.prisma.pharmacies.findMany({
      where: { userId },
      include: {
        user: true,
        medicines: true,
        transactions: true,
      },
    });
  }

  update(id: string, updatePharmaciesDto: UpdatePharmaciesDto) {
    return this.prisma.pharmacies.update({
      where: { id },
      data: updatePharmaciesDto,
      include: {
        user: true,
        medicines: true,
        transactions: true,
      },
    });
  }

  remove(id: string) {
    return this.prisma.pharmacies.delete({
      where: { id },
    });
  }
}
