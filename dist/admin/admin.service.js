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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const user_entity_1 = require("../user/entities/user.entity");
const argon = require("argon2");
const user_service_1 = require("../user/user.service");
let AdminService = exports.AdminService = class AdminService {
    constructor(userRepository, userService) {
        this.userRepository = userRepository;
        this.userService = userService;
    }
    async create(createUserDto) {
        const { password } = createUserDto;
        const hashedPassword = await argon.hash(password);
        createUserDto.role = 'admin';
        return await this.userRepository.create({
            ...createUserDto,
            password: hashedPassword,
        }, { raw: true });
    }
    async getAllUser(page = 1, pageSize = 10) {
        const offset = (page - 1) * pageSize;
        const users = await user_entity_1.User.findAll({
            attributes: ['id', 'firstName', 'lastName', 'email', 'role'],
            offset,
            limit: pageSize,
            order: [['createdAt', 'ASC']],
        });
        return users;
    }
    async getUserDetails(userId) {
        const user = await this.userRepository.findByPk(userId, { raw: true });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        const { password, ...cleanUser } = user;
        return cleanUser;
    }
    async update(id, updateUserDto) {
        const user = await this.userRepository.findByPk(id);
        for (const key in updateUserDto) {
            if (updateUserDto[key] !== null) {
                if (key.toLowerCase() === 'password') {
                    updateUserDto.password = await argon.hash(updateUserDto.password);
                }
                if (key.toLowerCase() === 'email') {
                    const existingUser = await this.userService.findByEmail(updateUserDto.email);
                    if (existingUser)
                        throw new common_1.ConflictException('Email belongs to another user.');
                }
                user[key] = updateUserDto[key];
            }
        }
        await user.save();
        return 'Update Successful';
    }
    async remove(id) {
        await this.userRepository.destroy({
            where: { id },
        });
    }
};
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(user_entity_1.User)),
    __metadata("design:paramtypes", [Object, user_service_1.UserService])
], AdminService);
//# sourceMappingURL=admin.service.js.map