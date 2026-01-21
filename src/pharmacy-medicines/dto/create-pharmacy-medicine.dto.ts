import { IsNotEmpty, IsUUID, IsNumber, Min, IsInt } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreatePharmacyMedicineDto {
  @IsUUID('all', { message: 'Pharmacy ID harus UUID yang valid' })
  @IsNotEmpty({ message: 'Pharmacy ID tidak boleh kosong' })
  pharmacyId: string;

  @IsUUID('all', { message: 'Medicine ID harus UUID yang valid' })
  @IsNotEmpty({ message: 'Medicine ID tidak boleh kosong' })
  medicineId: string;

  @IsInt({ message: 'Stock harus berupa angka bulat' })
  @IsNumber({}, { message: 'Stock harus berupa angka' })
  @IsNotEmpty({ message: 'Stock tidak boleh kosong' })
  @Min(0, { message: 'Stock minimal 0' })
  @Transform(({ value }) => parseInt(value, 10))
  stock: number;

  @IsNumber({}, { message: 'Harga harus berupa angka' })
  @IsNotEmpty({ message: 'Harga tidak boleh kosong' })
  @Min(1000, { message: 'Harga minimal Rp 1.000' })
  @Transform(({ value }) => parseFloat(value))
  price: number;
}
