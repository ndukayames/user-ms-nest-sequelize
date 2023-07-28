import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [SequelizeModule.forFeature([User]), UserModule],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
