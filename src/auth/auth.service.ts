import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as argon from 'argon2';

import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { SigninDto } from './dto/signin.dto';
import { User } from 'src/user/entities/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { AdminService } from 'src/admin/admin.service';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private userService: UserService,
    private config: ConfigService,
    private adminService: AdminService,
  ) {}

  async userSignup(dto: CreateUserDto) {
    try {
      // check if user exists
      const existingUser = await this.userService.findByEmail(dto.email);

      if (existingUser) throw new ConflictException('User already signed up.');

      const user = await this.userService.create(dto);

      return this.generateToken(user);
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }

  async userSignin(dto: SigninDto) {
    // find user

    const user = await this.userService.findByEmail(dto.email);

    // check if user is found
    if (!user) {
      throw new UnauthorizedException("email doesn't belong to any account.");
    }

    // compare password
    const isPasswordMatch = await argon.verify(user.password, dto.password);
    if (!isPasswordMatch) {
      throw new UnauthorizedException('Wrong password.');
    }

    return this.generateToken(user);
  }

  async adminSignup(dto: CreateUserDto) {
    try {
      // check if user exists
      const existingUser = await this.userService.findByEmail(dto.email);

      if (existingUser) throw new ConflictException('User already signed up.');

      const user = await this.adminService.create(dto);

      return this.generateToken(user);
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }

  async adminSignin(dto: SigninDto) {
    // find user
    const user = await this.userService.findByEmail(dto.email);

    // check if user is found
    if (!user) {
      throw new UnauthorizedException("email doesn't belong to any account.");
    }
    if (user.role.toLowerCase() !== 'admin') {
      throw new UnauthorizedException('Only admins can login');
    }

    // compare password
    const isPasswordMatch = await argon.verify(user.password, dto.password);
    if (!isPasswordMatch) {
      throw new UnauthorizedException('Wrong password.');
    }

    return this.generateToken(user);
  }

  async generateToken(user: User) {
    const payload = {
      sub: user.id,
      userRole: user.role,
    };

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '150m',
      secret: this.config.get('JWT_SECRET'),
    });

    return { access_token: token };
  }
}
