import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateCartDto {
  @IsUUID('all', { message: 'User ID harus UUID yang valid' })
  @IsNotEmpty({ message: 'User ID tidak boleh kosong' })
  userId: string;
}
