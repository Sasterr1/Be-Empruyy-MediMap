import {
  IsUUID,
  IsEnum,
  IsArray,
  ValidateNested,
  IsInt,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum PaymentMethod {
  CASH = 'CASH',
  TRANSFER = 'TRANSFER',
  E_WALLET = 'E_WALLET',
}

class TransactionItemDto {
  @IsUUID()
  medicineId: string;

  @IsInt()
  @Min(1)
  quantity: number;
}

export class CreateTransactionDto {
  @IsUUID()
  pharmacyId: string;

  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TransactionItemDto)
  items: TransactionItemDto[];
}
