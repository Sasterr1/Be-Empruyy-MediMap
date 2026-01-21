import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
export class CreatePharmacyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  address: string;

  @IsString()
  phone: string;

@Type(() => Number)
@IsNumber()
latitude: number;

@Type(() => Number)
@IsNumber()
longitude: number;

  @IsString()
  openTime: number;

  @IsString()
  closeTime: string;
}
