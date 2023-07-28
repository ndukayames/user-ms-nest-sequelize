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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("./entities/user.entity");
const argon = require("argon2");
const sequelize_1 = require("@nestjs/sequelize");
let UserService = exports.UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async create(createUserDto) {
        const { password } = createUserDto;
        const hashedPassword = await argon.hash(password);
        createUserDto.role = 'user';
        return this.userRepository.create({
            ...createUserDto,
            password: hashedPassword,
        });
    }
    async findByEmail(email) {
        const existingUser = await this.userRepository.findOne({
            where: {
                email: email,
            },
            raw: true,
        });
        return existingUser;
    }
    async findOneUser(id) {
        const user = await this.userRepository.findOne({
            where: { id: id, role: 'user' },
            raw: true,
        });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        return user;
    }
    async findOneAdmin(id) {
        const user = await this.userRepository.findOne({
            where: { id: id, role: 'admin' },
            raw: true,
        });
        if (!user)
            throw new common_1.NotFoundException('Admin user not found.');
        return user;
    }
    async update(id, updateUserDto) {
        const user = await this.userRepository.findByPk(id);
        for (const key in updateUserDto) {
            if (updateUserDto[key] !== null) {
                if (key.toLowerCase() === 'password') {
                    updateUserDto.password = await argon.hash(updateUserDto.password);
                }
                if (key.toLowerCase() === 'email') {
                    const existingUser = await this.findByEmail(updateUserDto.email);
                    if (existingUser)
                        throw new common_1.ConflictException('Email belongs to another user.');
                }
                if (key.toLowerCase() === 'role') {
                    updateUserDto.role = 'user';
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
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(user_entity_1.User)),
    __metadata("design:paramtypes", [Object])
], UserService);
//# sourceMappingURL=user.service.js.map