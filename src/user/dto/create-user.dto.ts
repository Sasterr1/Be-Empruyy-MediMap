import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MinLength,
  MaxLength,
  IsUUID,
} from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Username harus berupa string' })
  @IsNotEmpty({ message: 'Username tidak boleh kosong' })
  @MinLength(3, { message: 'Username minimal 3 karakter' })
  @MaxLength(100, { message: 'Username maksimal 100 karakter' })
  username: string;

  @IsEmail({}, { message: 'Email tidak valid' })
  @IsNotEmpty({ message: 'Email tidak boleh kosong' })
  email: string;

  @IsString({ message: 'Password harus berupa string' })
  @IsNotEmpty({ message: 'Password tidak boleh kosong' })
  @MinLength(6, { message: 'Password minimal 6 karakter' })
  password: string;

  @IsString({ message: 'Nama lengkap harus berupa string' })
  @IsNotEmpty({ message: 'Nama lengkap tidak boleh kosong' })
  @MaxLength(100, { message: 'Nama lengkap maksimal 100 karakter' })
  full_name: string;

  @IsString({ message: 'Nomor telepon harus berupa string' })
  @IsOptional()
  @MaxLength(20, { message: 'Nomor telepon maksimal 20 karakter' })
  phone?: string;

  @IsString({ message: 'Alamat harus berupa string' })
  @IsOptional()
  @MaxLength(100, { message: 'Alamat maksimal 100 karakter' })
  address?: string;

  @IsUUID('all', { message: 'User Role ID harus UUID yang valid' })
  @IsNotEmpty({ message: 'User Role ID tidak boleh kosong' })
  userRoleId: string;
}
