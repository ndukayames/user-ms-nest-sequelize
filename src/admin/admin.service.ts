import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { User } from 'src/user/entities/user.entity';

import * as argon from 'argon2';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
    private userService: UserService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { password } = createUserDto;
    const hashedPassword = await argon.hash(password);
    createUserDto.role = 'admin';
    return await this.userRepository.create(
      {
        ...createUserDto,
        password: hashedPassword,
      },
      { raw: true },
    );
  }

  async getAllUser(page: number = 1, pageSize: number = 10) {
    // Calculate the offset to skip records based on the page and limit
    const offset = (page - 1) * pageSize;

    const users = await User.findAll({
      attributes: ['id', 'firstName', 'lastName', 'email', 'role'],
      offset,
      limit: pageSize,
      order: [['createdAt', 'ASC']],
    });

    return users;
  }

  async getUserDetails(userId: number) {
    const user = await this.userRepository.findByPk(userId, { raw: true });

    if (!user) throw new NotFoundException('User not found');

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...cleanUser } = user;

    return cleanUser;
  }
  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findByPk(id);

    // Update only the provided fields in updateUserDto
    for (const key in updateUserDto) {
      if (updateUserDto[key] !== null) {
        if (key.toLowerCase() === 'password') {
          updateUserDto.password = await argon.hash(updateUserDto.password);
        }
        if (key.toLowerCase() === 'email') {
          const existingUser = await this.userService.findByEmail(
            updateUserDto.email,
          );
          if (existingUser)
            throw new ConflictException('Email belongs to another user.');
        }

        user[key] = updateUserDto[key];
      }
    }

    await user.save();

    return 'Update Successful';
  }
  async remove(id: number) {
    await this.userRepository.destroy({
      where: { id },
    });
  }
}
