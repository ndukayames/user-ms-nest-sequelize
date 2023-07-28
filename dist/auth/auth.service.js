"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const argon = require("argon2");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../user/user.service");
const admin_service_1 = require("../admin/admin.service");
let AuthService = exports.AuthService = class AuthService {
    constructor(jwt, userService, config, adminService) {
        this.jwt = jwt;
        this.userService = userService;
        this.config = config;
        this.adminService = adminService;
    }
    async userSignup(dto) {
        try {
            const existingUser = await this.userService.findByEmail(dto.email);
            if (existingUser)
                throw new common_1.ConflictException('User already signed up.');
            const user = await this.userService.create(dto);
            return this.generateToken(user);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async userSignin(dto) {
        const user = await this.userService.findByEmail(dto.email);
        if (!user) {
            throw new common_1.UnauthorizedException("email doesn't belong to any account.");
        }
        const isPasswordMatch = await argon.verify(user.password, dto.password);
        if (!isPasswordMatch) {
            throw new common_1.UnauthorizedException('Wrong password.');
        }
        return this.generateToken(user);
    }
    async adminSignup(dto) {
        try {
            const existingUser = await this.userService.findByEmail(dto.email);
            if (existingUser)
                throw new common_1.ConflictException('User already signed up.');
            const user = await this.adminService.create(dto);
            return this.generateToken(user);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async adminSignin(dto) {
        const user = await this.userService.findByEmail(dto.email);
        if (!user) {
            throw new common_1.UnauthorizedException("email doesn't belong to any account.");
        }
        if (user.role.toLowerCase() !== 'admin') {
            throw new common_1.UnauthorizedException('Only admins can login');
        }
        const isPasswordMatch = await argon.verify(user.password, dto.password);
        if (!isPasswordMatch) {
            throw new common_1.UnauthorizedException('Wrong password.');
        }
        return this.generateToken(user);
    }
    async generateToken(user) {
        const payload = {
            sub: user.id,
            userRole: user.role,
        };
        const token = await this.jwt.signAsync(payload, {
            expiresIn: '150m',
            secret: 'secret',
        });
        return { access_token: token };
    }
};
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        user_service_1.UserService,
        config_1.ConfigService,
        admin_service_1.AdminService])
], AuthService);
//# sourceMappingURL=auth.service.js.map