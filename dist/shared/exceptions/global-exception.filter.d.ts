import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
export declare class GlobalExceptionHandler implements ExceptionFilter {
    private readonly logger;
    catch(exception: any, host: ArgumentsHost): void;
}
