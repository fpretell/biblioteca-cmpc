"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerosService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const genero_model_1 = require("./entities/genero.model");
let GenerosService = class GenerosService {
    constructor(generoModel) {
        this.generoModel = generoModel;
    }
    create(dto) {
        return this.generoModel.create(dto);
    }
    findAll() {
        return this.generoModel.findAll();
    }
    async findOne(id) {
        const genero = await this.generoModel.findByPk(id);
        if (!genero) {
            throw new common_1.NotFoundException(`Género con ID ${id} no encontrado`);
        }
        return genero;
    }
    async remove(id) {
        const genero = await this.findOne(id);
        await genero.destroy();
    }
};
exports.GenerosService = GenerosService;
exports.GenerosService = GenerosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(genero_model_1.Genero)),
    __metadata("design:paramtypes", [Object])
], GenerosService);
