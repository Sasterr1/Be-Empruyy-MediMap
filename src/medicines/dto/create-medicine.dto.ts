import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export class CreateMedicineDto {
  @IsString({ message: 'Nama obat harus berupa string' })
  @IsNotEmpty({ message: 'Nama obat tidak boleh kosong' })
  @MinLength(3, { message: 'Nama obat minimal 3 karakter' })
  @MaxLength(150, { message: 'Nama obat maksimal 150 karakter' })
  name: string;

  @IsString({ message: 'Kategori harus berupa string' })
  @IsNotEmpty({ message: 'Kategori tidak boleh kosong' })
  @MaxLength(100, { message: 'Kategori maksimal 100 karakter' })
  category: string;

  @IsString({ message: 'Deskripsi harus berupa string' })
  @IsNotEmpty({ message: 'Deskripsi tidak boleh kosong' })
  @MinLength(10, { message: 'Deskripsi minimal 10 karakter' })
  description: string;
}
