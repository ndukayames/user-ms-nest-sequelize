import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
}
