declare const UserJwtAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class UserJwtAuthGuard extends UserJwtAuthGuard_base {
    handleRequest<TUser = any>(err: any, user: any): TUser;
}
export {};
