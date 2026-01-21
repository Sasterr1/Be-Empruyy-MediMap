import { Module } from '@nestjs/common';
import { PharmacyMedicinesService } from './pharmacy-medicines.service';
import { PharmacyMedicinesController } from './pharmacy-medicines.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PharmacyMedicinesController],
  providers: [PharmacyMedicinesService],
})
export class PharmacyMedicinesModule {}
