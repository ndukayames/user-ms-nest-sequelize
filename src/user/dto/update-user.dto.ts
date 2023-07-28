import { IsOptional, IsString, IsEmail, IsIn, Length } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @Length(6, 20)
  password?: string;

  @IsOptional()
  @IsIn(['user', 'admin'])
  role?: 'user' | 'admin';
}
