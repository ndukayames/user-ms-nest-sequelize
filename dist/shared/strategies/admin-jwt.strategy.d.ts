import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
import { UserService } from 'src/user/user.service';
declare const AdminJwtStrategy_base: new (...args: any[]) => Strategy;
export declare class AdminJwtStrategy extends AdminJwtStrategy_base {
    private configService;
    private userService;
    constructor(configService: ConfigService, userService: UserService);
    validate(payload: {
        sub: number;
    }): Promise<import("../../user/entities/user.entity").User>;
}
export {};
