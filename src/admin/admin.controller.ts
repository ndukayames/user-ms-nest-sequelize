import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminJwtAuthGuard } from 'src/shared/guards/admin-jwt-auth.guard';
import { GetUser } from 'src/shared/decorators/get-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';

@Controller('admins')
@UseGuards(AdminJwtAuthGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('all-users')
  getAllUsers(
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 10,
  ) {
    return this.adminService.getAllUser(page, limit);
  }

  @Get()
  getAdminProfile(@GetUser() admin: User) {
    return admin;
  }

  @Get('users/:id')
  getUserDetails(@Param('id', ParseIntPipe) userId: number) {
    return this.adminService.getUserDetails(userId);
  }

  @Patch()
  update(@GetUser('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.adminService.update(id, updateUserDto);
  }

  @Delete()
  remove(@GetUser('id') id: number) {
    return this.adminService.remove(id);
  }
}
