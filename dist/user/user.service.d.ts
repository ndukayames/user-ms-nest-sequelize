import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: typeof User);
    create(createUserDto: CreateUserDto): Promise<User>;
    findByEmail(email: string): Promise<User>;
    findOneUser(id: number): Promise<User>;
    findOneAdmin(id: number): Promise<User>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<string>;
    remove(id: number): Promise<void>;
}
