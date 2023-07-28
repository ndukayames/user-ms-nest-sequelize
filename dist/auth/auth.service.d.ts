import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { SigninDto } from './dto/signin.dto';
import { User } from 'src/user/entities/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { AdminService } from 'src/admin/admin.service';
export declare class AuthService {
    private jwt;
    private userService;
    private config;
    private adminService;
    constructor(jwt: JwtService, userService: UserService, config: ConfigService, adminService: AdminService);
    userSignup(dto: CreateUserDto): Promise<{
        access_token: string;
    }>;
    userSignin(dto: SigninDto): Promise<{
        access_token: string;
    }>;
    adminSignup(dto: CreateUserDto): Promise<{
        access_token: string;
    }>;
    adminSignin(dto: SigninDto): Promise<{
        access_token: string;
    }>;
    generateToken(user: User): Promise<{
        access_token: string;
    }>;
}
