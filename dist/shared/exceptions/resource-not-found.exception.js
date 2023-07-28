"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceNotFoundException = void 0;
const common_1 = require("@nestjs/common");
class ResourceNotFoundException extends common_1.HttpException {
    constructor(message, resource, resourceValue) {
        let errMsg = 'Resource Not Found Exception';
        if (resource && resourceValue) {
            errMsg = `Resource ${resource} with value ${resourceValue} doesn't exists`;
        }
        else {
            errMsg = message;
        }
        super(errMsg, common_1.HttpStatus.NOT_FOUND);
        this.resource = resource;
        this.resourceValue = resourceValue;
    }
}
exports.ResourceNotFoundException = ResourceNotFoundException;
//# sourceMappingURL=resource-not-found.exception.js.map