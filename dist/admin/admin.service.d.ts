import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
export declare class AdminService {
    private readonly userRepository;
    private userService;
    constructor(userRepository: typeof User, userService: UserService);
    create(createUserDto: CreateUserDto): Promise<User>;
    getAllUser(page?: number, pageSize?: number): Promise<User[]>;
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
