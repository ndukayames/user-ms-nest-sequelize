import { HttpException } from '@nestjs/common';
export declare class ResourceNotFoundException extends HttpException {
    private resource?;
    private resourceValue?;
    constructor(message?: string, resource?: string, resourceValue?: string);
}
