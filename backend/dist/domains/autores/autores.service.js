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
exports.AutoresService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const autor_model_1 = require("./entities/autor.model");
const libro_model_1 = require("../libros/entities/libro.model");
let AutoresService = class AutoresService {
    constructor(autorModel) {
        this.autorModel = autorModel;
    }
    create(dto) {
        return this.autorModel.create(dto);
    }
    findAll() {
        return this.autorModel.findAll();
    }
    async findOne(id) {
        const autor = await this.autorModel.findByPk(id);
        if (!autor) {
            throw new common_1.NotFoundException(`Autor con ID ${id} no encontrado`);
        }
        return autor;
    }
    async remove(id) {
        const autor = await this.findOne(id);
        await autor.destroy();
    }
    async exportToCsvData() {
        const autores = await this.autorModel.findAll({
            include: [libro_model_1.Libro],
        });
        return autores.map((autor) => ({
            id: autor.id,
            nombre: autor.nombre,
            cantidadLibros: autor.libros?.length ?? 0,
        }));
    }
};
exports.AutoresService = AutoresService;
exports.AutoresService = AutoresService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(autor_model_1.Autor)),
    __metadata("design:paramtypes", [Object])
], AutoresService);
