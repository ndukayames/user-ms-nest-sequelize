import { Strategy } from 'passport-jwt';
import { UserService } from 'src/user/user.service';
declare const UserJwtStrategy_base: new (...args: any[]) => Strategy;
export declare class UserJwtStrategy extends UserJwtStrategy_base {
    private userService;
    constructor(userService: UserService);
    validate(payload: {
        sub: number;
    }): Promise<import("../../user/entities/user.entity").User>;
}
export {};
