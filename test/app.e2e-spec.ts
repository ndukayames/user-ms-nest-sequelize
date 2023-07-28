import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from './../src/app.module';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { SigninDto } from 'src/auth/dto/signin.dto';
import { GlobalExceptionHandler } from 'src/shared/exceptions/global-exception.filter';
import { ResponseInterceptor } from 'src/shared/interceptors/Response.interceptor';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let userToken = null;
  let adminToken = null;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalInterceptors(new ResponseInterceptor());
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        stopAtFirstError: true,
        transform: true,
      }),
    );
    app.useGlobalFilters(new GlobalExceptionHandler());
    await app.init();
    await app.listen(3001);
  }, 10000);

  describe('Auth', () => {
    const signupUser: CreateUserDto = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe.new@example.com',
      password: 'secretpassword',
    };
    const signinUser: SigninDto = {
      email: 'john.doe.new@example.com',
      password: 'secretpassword',
    };

    const signupAdmin: CreateUserDto = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe.admin@example.com',
      password: 'secretpassword',
    };
    const signinAdmin: SigninDto = {
      email: 'john.doe.admin@example.com',
      password: 'secretpassword',
    };

    it('it should create a new user account', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/users/signup')
        .send(signupUser);

      expect(response.status).toBe(201);
    }, 10000);

    it('it should create a new admin account', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/admins/signup')
        .send(signupAdmin);

      expect(response.status).toBe(201);
    }, 10000);

    it('it should login user', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/users/signin')
        .send(signinUser);

      expect(response.status).toBe(200);
      userToken = response.body.result.access_token;
    }, 100000);
    it('it should login admin', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/admins/signin')
        .send(signinAdmin);

      expect(response.status).toBe(200);
      adminToken = response.body.result.access_token;
    }, 100000);

    it('it should not allow user login as admin', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/admins/signin')
        .send(signinUser);

      expect(response.status).toBe(401);
    }, 100000);
  });

  describe('Operations', () => {
    it('it should allow admin view all users', async () => {
      await request(app.getHttpServer())
        .get('/admins/all-users?page=1&limit=100')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);
    });
    it('it should not allow users view all users', async () => {
      await request(app.getHttpServer())
        .get('/admins/all-users?page=1&limit=100')
        .set('Authorization', `Bearer ${userToken}`)
        .expect(401);
    });
  });
});
