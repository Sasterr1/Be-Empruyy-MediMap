import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsOptional,
  IsPhoneNumber,
} from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  @IsOptional()
  full_name?: string;

  @IsOptional()
  @IsPhoneNumber('ID')
  phone?: string;

  @IsOptional()
  address?: string;
}
