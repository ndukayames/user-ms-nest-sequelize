import { AdminService } from './admin.service';
import { User } from 'src/user/entities/user.entity';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    getAllUsers(page?: number, limit?: number): Promise<User[]>;
    getAdminProfile(admin: User): User;
    getUserDetails(userId: number): Promise<{
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        role: "user" | "admin";
        createdAt?: any;
        updatedAt?: any;
        deletedAt?: any;
        version?: any;
        _attributes: any;
        dataValues: any;
        _creationAttributes: any;
        isNewRecord: boolean;
        sequelize: import("sequelize").Sequelize;
        _model: import("sequelize").Model<any, any>;
    }>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<string>;
    remove(id: number): Promise<void>;
}
