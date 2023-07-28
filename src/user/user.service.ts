import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as argon from 'argon2';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { password } = createUserDto;
    const hashedPassword = await argon.hash(password);
    createUserDto.role = 'user';
    return this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
  }

  async findByEmail(email: string) {
    const existingUser = await this.userRepository.findOne({
      where: {
        email: email,
      },
      raw: true,
    });

    return existingUser;
  }

  async findOneUser(id: number) {
    const user = await this.userRepository.findOne({
      where: { id: id, role: 'user' },
      raw: true,
    });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async findOneAdmin(id: number) {
    const user = await this.userRepository.findOne({
      where: { id: id, role: 'admin' },
      raw: true,
    });

    if (!user) throw new NotFoundException('Admin user not found.');

    return user;
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
          const existingUser = await this.findByEmail(updateUserDto.email);
          if (existingUser)
            throw new ConflictException('Email belongs to another user.');
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

  async remove(id: number) {
    await this.userRepository.destroy({
      where: { id },
    });
  }
}
