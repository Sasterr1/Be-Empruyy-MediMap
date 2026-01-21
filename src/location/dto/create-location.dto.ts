import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateLocationDto {
  @IsUUID('all', { message: 'User ID harus UUID yang valid' })
  @IsNotEmpty({ message: 'User ID tidak boleh kosong' })
  userId: string;

  @IsNumber({}, { message: 'Latitude harus berupa angka' })
  @IsNotEmpty({ message: 'Latitude tidak boleh kosong' })
  @Transform(({ value }) => parseFloat(value))
  latitude: number;

  @IsNumber({}, { message: 'Longitude harus berupa angka' })
  @IsNotEmpty({ message: 'Longitude tidak boleh kosong' })
  @Transform(({ value }) => parseFloat(value))
  longitude: number;
}
