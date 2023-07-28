import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SigninDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @IsEmail()
  @ApiProperty()
  email: string;
}
