"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const http_request_interceptor_1 = require("./shared/interceptors/http-request.interceptor");
const Response_interceptor_1 = require("./shared/interceptors/Response.interceptor");
const global_exception_filter_1 = require("./shared/exceptions/global-exception.filter");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api/v1');
    app.useGlobalInterceptors(new http_request_interceptor_1.LoggingInterceptor(), new Response_interceptor_1.ResponseInterceptor());
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        stopAtFirstError: true,
        transform: true,
    }));
    app.useGlobalFilters(new global_exception_filter_1.GlobalExceptionHandler());
    const config = new swagger_1.DocumentBuilder()
        .setTitle('NerdBug User Microservice')
        .setDescription(`a fictional user microservice that allows users to authenticate and perform basic profile operations.`)
        .setVersion('1.0')
        .addTag('API')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('doc', app, document);
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map