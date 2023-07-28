import { HttpException } from '@nestjs/common';
export declare class DuplicateResourceException extends HttpException {
    private resource?;
    private resourceValue?;
    constructor(message?: string, resource?: string, resourceValue?: string);
}
