"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllExceptionsFilter = void 0;
// src/common/filters/validation-exception.filter.ts
const common_1 = require("@nestjs/common");
let AllExceptionsFilter = class AllExceptionsFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception.getStatus();
        const exceptionResponse = exception.getResponse();
        let validationErrors = null;
        if (typeof exceptionResponse === 'object' &&
            exceptionResponse.hasOwnProperty('message') &&
            Array.isArray(exceptionResponse.message)) {
            validationErrors = exceptionResponse.message.map((err) => {
                if (typeof err === 'string')
                    return err;
                if (typeof err === 'object' && err.constraints) {
                    return Object.values(err.constraints).join(', ');
                }
                return err;
            });
        }
        // Loguear error completo en consola para debugging
        console.error('ValidationException:', JSON.stringify(exceptionResponse, null, 2));
        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            errors: validationErrors || exceptionResponse,
        });
    }
};
exports.AllExceptionsFilter = AllExceptionsFilter;
exports.AllExceptionsFilter = AllExceptionsFilter = __decorate([
    (0, common_1.Catch)(common_1.BadRequestException)
], AllExceptionsFilter);
