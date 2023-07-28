import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './shared/interceptors/http-request.interceptor';
import { ResponseInterceptor } from './shared/interceptors/Response.interceptor';
import { GlobalExceptionHandler } from './shared/exceptions/global-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.useGlobalInterceptors(
    new LoggingInterceptor(),
    new ResponseInterceptor(),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      stopAtFirstError: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new GlobalExceptionHandler());

  const config = new DocumentBuilder()
    .setTitle('NerdBug User Microservice')
    .setDescription(
      `a fictional user microservice that allows users to authenticate and perform basic profile operations.`,
    )
    .setVersion('1.0')
    .addTag('API')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);
  await app.listen(3000);
}
bootstrap();
