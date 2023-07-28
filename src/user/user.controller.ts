import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserJwtAuthGuard } from 'src/shared/guards/user-jwt-auth.guard';
import { GetUser } from 'src/shared/decorators/get-user.decorator';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
@UseGuards(UserJwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUserDetails(@GetUser() user: User) {
    return user;
  }

  @Patch()
  update(@GetUser('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete()
  remove(@GetUser('id') id: number) {
    return this.userService.remove(id);
  }
}
