import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePharmacyMedicineDto } from './dto/create-pharmacy-medicine.dto';
import { UpdatePharmacyMedicineDto } from './dto/update-pharmacy-medicine.dto';
import { NotFoundException } from '@nestjs/common';
@Injectable()
export class PharmacyMedicinesService {
  constructor(private prisma: PrismaService) {}
  async createForUser(
    dto: CreatePharmacyMedicineDto,
    userId: string,
  ) {
    // 1️⃣ Cari pharmacy milik user
    const pharmacy = await this.prisma.pharmacies.findUnique({
      where: { userId },
    });

    if (!pharmacy) {
      throw new NotFoundException('Pharmacy not found');
    }

    // 2️⃣ Buat pharmacy medicine
    return this.prisma.pharmacy_medicines.create({
      data: {
        pharmacyId: pharmacy.id,
        medicineId: dto.medicineId,
        price: dto.price,
        stock: dto.stock,
      },
    });
  }
  create(createPharmacyMedicineDto: CreatePharmacyMedicineDto) {
    return this.prisma.pharmacy_medicines.create({
      data: createPharmacyMedicineDto,
      include: {
        pharmacy: true,
        medicine: true,
      },
    });
  }

  findAll() {
    return this.prisma.pharmacy_medicines.findMany({
      include: {
        pharmacy: true,
        medicine: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.pharmacy_medicines.findUnique({
      where: { id },
      include: {
        pharmacy: true,
        medicine: true,
      },
    });
  }

  findByPharmacy(pharmacyId: string) {
    return this.prisma.pharmacy_medicines.findMany({
      where: { pharmacyId },
      include: {
        pharmacy: true,
        medicine: true,
      },
    });
  }

  findByMedicine(medicineId: string) {
    return this.prisma.pharmacy_medicines.findMany({
      where: { medicineId },
      include: {
        pharmacy: true,
        medicine: true,
      },
    });
  }
async findByUser(userId: string) {
  const pharmacy = await this.prisma.pharmacies.findUnique({
    where: { userId },
  });

  if (!pharmacy) {
    throw new NotFoundException('Pharmacy not found');
  }

  return this.prisma.pharmacy_medicines.findMany({
    where: { pharmacyId: pharmacy.id },
    include: { medicine: true },
  });
}

  update(id: string, updatePharmacyMedicineDto: UpdatePharmacyMedicineDto) {
    return this.prisma.pharmacy_medicines.update({
      where: { id },
      data: updatePharmacyMedicineDto,
      include: {
        pharmacy: true,
        medicine: true,
      },
    });
  }

  remove(id: string) {
    return this.prisma.pharmacy_medicines.delete({
      where: { id },
    });
  }
}
