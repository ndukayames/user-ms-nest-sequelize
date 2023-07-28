"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminJwtAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
let AdminJwtAuthGuard = exports.AdminJwtAuthGuard = class AdminJwtAuthGuard extends (0, passport_1.AuthGuard)('adminJwt') {
    handleRequest(err, user) {
        if (err || !user) {
            throw new common_1.UnauthorizedException('This routes is only available to logged in admin users.');
        }
        return user;
    }
};
exports.AdminJwtAuthGuard = AdminJwtAuthGuard = __decorate([
    (0, common_1.Injectable)()
], AdminJwtAuthGuard);
//# sourceMappingURL=admin-jwt-auth.guard.js.map