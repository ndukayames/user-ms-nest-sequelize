import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { AdminModule } from 'src/admin/admin.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [JwtModule.register({}), UserModule, AdminModule],
})
export class AuthModule {}
