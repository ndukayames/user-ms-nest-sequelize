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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const admin_service_1 = require("./admin.service");
const admin_jwt_auth_guard_1 = require("../shared/guards/admin-jwt-auth.guard");
const get_user_decorator_1 = require("../shared/decorators/get-user.decorator");
const user_entity_1 = require("../user/entities/user.entity");
const update_user_dto_1 = require("../user/dto/update-user.dto");
let AdminController = exports.AdminController = class AdminController {
    constructor(adminService) {
        this.adminService = adminService;
    }
    getAllUsers(page = 1, limit = 10) {
        return this.adminService.getAllUser(page, limit);
    }
    getAdminProfile(admin) {
        return admin;
    }
    getUserDetails(userId) {
        return this.adminService.getUserDetails(userId);
    }
    update(id, updateUserDto) {
        return this.adminService.update(id, updateUserDto);
    }
    remove(id) {
        return this.adminService.remove(id);
    }
};
__decorate([
    (0, common_1.Get)('all-users'),
    __param(0, (0, common_1.Query)('page', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('limit', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getAdminProfile", null);
__decorate([
    (0, common_1.Get)('users/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getUserDetails", null);
__decorate([
    (0, common_1.Patch)(),
    __param(0, (0, get_user_decorator_1.GetUser)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(),
    __param(0, (0, get_user_decorator_1.GetUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "remove", null);
exports.AdminController = AdminController = __decorate([
    (0, common_1.Controller)('admins'),
    (0, common_1.UseGuards)(admin_jwt_auth_guard_1.AdminJwtAuthGuard),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map