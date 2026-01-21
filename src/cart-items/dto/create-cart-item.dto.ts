import { IsNotEmpty, IsUUID, IsNumber, Min, IsInt } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateCartItemDto {
  @IsUUID('all', { message: 'Cart ID harus UUID yang valid' })
  @IsNotEmpty({ message: 'Cart ID tidak boleh kosong' })
  cartId: string;

  @IsUUID('all', { message: 'Medicine ID harus UUID yang valid' })
  @IsNotEmpty({ message: 'Medicine ID tidak boleh kosong' })
  medicineId: string;

  @IsInt({ message: 'Quantity harus berupa angka bulat' })
  @IsNumber({}, { message: 'Quantity harus berupa angka' })
  @IsNotEmpty({ message: 'Quantity tidak boleh kosong' })
  @Min(1, { message: 'Quantity minimal 1' })
  @Transform(({ value }) => parseInt(value, 10))
  quantity: number;
}
