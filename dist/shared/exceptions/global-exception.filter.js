"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var GlobalExceptionHandler_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalExceptionHandler = void 0;
const common_1 = require("@nestjs/common");
let GlobalExceptionHandler = exports.GlobalExceptionHandler = GlobalExceptionHandler_1 = class GlobalExceptionHandler {
    constructor() {
        this.logger = new common_1.Logger(GlobalExceptionHandler_1.name);
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const status = exception.getStatus ? exception.getStatus() : 500;
        const message = (exception.response && exception.response.message) ||
            exception.message ||
            'Internal server error';
        const errorResponse = {
            success: false,
            statusCode: status || 500,
            message: message,
            timestamp: new Date().toISOString(),
            path: ctx.getRequest().url,
        };
        console.log(exception);
        response.status(status).json(errorResponse);
    }
};
exports.GlobalExceptionHandler = GlobalExceptionHandler = GlobalExceptionHandler_1 = __decorate([
    (0, common_1.Catch)()
], GlobalExceptionHandler);
//# sourceMappingURL=global-exception.filter.js.map