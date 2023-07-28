"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DuplicateResourceException = void 0;
const common_1 = require("@nestjs/common");
class DuplicateResourceException extends common_1.HttpException {
    constructor(message, resource, resourceValue) {
        let errMsg = 'Duplicate Exception';
        if (resource && resourceValue) {
            errMsg = `Resource ${resource} with value ${resourceValue} already exists.`;
        }
        else {
            errMsg = message;
        }
        super(errMsg, common_1.HttpStatus.BAD_REQUEST);
        this.resource = resource;
        this.resourceValue = resourceValue;
    }
}
exports.DuplicateResourceException = DuplicateResourceException;
//# sourceMappingURL=duplicate-resource.exception%20copy.js.map