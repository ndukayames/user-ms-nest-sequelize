import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AdminJwtStrategy } from './shared/strategies/admin-jwt.strategy';
import { UserJwtStrategy } from './shared/strategies/user-jwt.strategy';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DB_HOST || 'db4free.net',
      port: parseInt(process.env.DB_PORT, 10) || 3306,
      username: process.env.DB_USERNAME || 'testerjames',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_DATABASE || 'nerbug_user_ms',
      models: [User],
      autoLoadModels: true,
      synchronize: true,
    }),
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService, AdminJwtStrategy, UserJwtStrategy],
})
export class AppModule {}
