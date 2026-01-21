import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { PharmacyMedicinesService } from './pharmacy-medicines.service';
import { CreatePharmacyMedicineDto } from './dto/create-pharmacy-medicine.dto';
import { UpdatePharmacyMedicineDto } from './dto/update-pharmacy-medicine.dto';

@Controller('pharmacy-medicines')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('PHARMACY')
export class PharmacyMedicinesController {
  constructor(
    private readonly pharmacyMedicinesService: PharmacyMedicinesService,
  ) {}

  // 🔥 PALING PENTING — OBAT MILIK PHARMACY LOGIN
  @Get('me')
  findMyMedicines(@Request() req) {
    const userId = req.user.userId;
    return this.pharmacyMedicinesService.findByUser(userId);
  }

  @Post()
  create(
    @Body() createPharmacyMedicineDto: CreatePharmacyMedicineDto,
    @Request() req,
  ) {
    const userId = req.user.userId;
    return this.pharmacyMedicinesService.createForUser(
      createPharmacyMedicineDto,
      userId,
    );
  }

  // ⛔ ROUTE SPESIFIK DI ATAS
  @Get('pharmacy/:pharmacyId')
  findByPharmacy(@Param('pharmacyId') pharmacyId: string) {
    return this.pharmacyMedicinesService.findByPharmacy(pharmacyId);
  }

  @Get('medicine/:medicineId')
  findByMedicine(@Param('medicineId') medicineId: string) {
    return this.pharmacyMedicinesService.findByMedicine(medicineId);
  }

  // ⛔ ROUTE DINAMIS PALING BAWAH
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pharmacyMedicinesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePharmacyMedicineDto: UpdatePharmacyMedicineDto,
  ) {
    return this.pharmacyMedicinesService.update(id, updatePharmacyMedicineDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pharmacyMedicinesService.remove(id);
  }
}
