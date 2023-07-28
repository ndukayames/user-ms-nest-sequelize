declare const AdminJwtAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class AdminJwtAuthGuard extends AdminJwtAuthGuard_base {
    handleRequest<TUser = any>(err: any, user: any): TUser;
}
export {};
