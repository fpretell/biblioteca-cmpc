"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditoriaModule = void 0;
// src/domains/auditoria/auditoria.module.ts
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const auditoria_model_1 = require("./entities/auditoria.model");
let AuditoriaModule = class AuditoriaModule {
};
exports.AuditoriaModule = AuditoriaModule;
exports.AuditoriaModule = AuditoriaModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([auditoria_model_1.Auditoria])],
        exports: [sequelize_1.SequelizeModule], // necesario para inyectarlo desde otros módulos
    })
], AuditoriaModule);
