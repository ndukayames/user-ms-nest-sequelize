import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUserDetails(user: User): User;
    update(id: number, updateUserDto: UpdateUserDto): Promise<string>;
    remove(id: number): Promise<void>;
}
