import { PartialType } from '@nestjs/mapped-types';
import { CreatePharmacyMedicineDto } from './create-pharmacy-medicine.dto';

export class UpdatePharmacyMedicineDto extends PartialType(
  CreatePharmacyMedicineDto,
) {}
