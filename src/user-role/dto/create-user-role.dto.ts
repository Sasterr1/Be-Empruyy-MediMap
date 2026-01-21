import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';

export class CreateUserRoleDto {
  @IsString({ message: 'Nama role harus berupa string' })
  @IsNotEmpty({ message: 'Nama role tidak boleh kosong' })
  @MinLength(3, { message: 'Nama role minimal 3 karakter' })
  @MaxLength(50, { message: 'Nama role maksimal 50 karakter' })
  @Matches(/^[A-Za-z\s]+$/, {
    message: 'Nama role hanya boleh berisi huruf dan spasi',
  })
  roleName: string;
}
