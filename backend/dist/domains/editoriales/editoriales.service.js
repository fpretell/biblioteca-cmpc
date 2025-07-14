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
exports.EditorialesService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const editorial_model_1 = require("./entities/editorial.model");
let EditorialesService = class EditorialesService {
    constructor(editorialModel) {
        this.editorialModel = editorialModel;
    }
    create(dto) {
        return this.editorialModel.create(dto);
    }
    findAll() {
        return this.editorialModel.findAll();
    }
    async findOne(id) {
        const editorial = await this.editorialModel.findByPk(id);
        if (!editorial) {
            throw new common_1.NotFoundException(`Editorial con ID ${id} no encontrada`);
        }
        return editorial;
    }
    async remove(id) {
        const editorial = await this.findOne(id);
        await editorial.destroy();
    }
};
exports.EditorialesService = EditorialesService;
exports.EditorialesService = EditorialesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(editorial_model_1.Editorial)),
    __metadata("design:paramtypes", [Object])
], EditorialesService);
