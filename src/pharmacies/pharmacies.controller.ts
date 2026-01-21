import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PharmaciesService } from './pharmacies.service';
import { CreatePharmacyDto } from './dto/create-pharmacies.dto';
import { UpdatePharmaciesDto } from './dto/update-pharmacies.dto';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { Request } from '@nestjs/common';

@Controller('pharmacies')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('PHARMACY')
export class PharmaciesController {
  constructor(private readonly pharmaciesService: PharmaciesService) {}
@Get('me/medicines')
getMyMedicines(@Request() req) {
  // JWT payload kamu berisi:
  // { sub, role, email }
  const userId = req.user.sub;

  return this.pharmaciesService.getMedicinesByUser(userId);
}
  @Post()
create(
  @Body() createPharmacyDto: CreatePharmacyDto,
  @Request() req,
) {
  // userId diambil dari JWT
  const userId = req.user.userId;

  return this.pharmaciesService.create(createPharmacyDto, userId);
}



  @Get()
  findAll() {
    return this.pharmaciesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pharmaciesService.findOne(id);
  }

  @Get('user/:userId')
  findByUserId(@Param('userId') userId: string) {
    return this.pharmaciesService.findByUserId(userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePharmaciesDto: UpdatePharmaciesDto,
  ) {
    return this.pharmaciesService.update(id, updatePharmaciesDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pharmaciesService.remove(id);
  }
}
