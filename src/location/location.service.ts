import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

@Injectable()
export class LocationService {
  constructor(private prisma: PrismaService) {}

  create(createLocationDto: CreateLocationDto) {
    return this.prisma.location.create({
      data: createLocationDto,
      include: {
        user: true,
      },
    });
  }

  findAll() {
    return this.prisma.location.findMany({
      include: {
        user: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.location.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });
  }

  findByUserId(userId: string) {
    return this.prisma.location.findUnique({
      where: { userId },
      include: {
        user: true,
      },
    });
  }

  update(id: string, updateLocationDto: UpdateLocationDto) {
    return this.prisma.location.update({
      where: { id },
      data: updateLocationDto,
      include: {
        user: true,
      },
    });
  }

  remove(id: string) {
    return this.prisma.location.delete({
      where: { id },
    });
  }
}
