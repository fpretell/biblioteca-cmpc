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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Genero = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const libro_model_1 = require("../../libros/entities/libro.model");
let Genero = class Genero extends sequelize_typescript_1.Model {
};
exports.Genero = Genero;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Genero.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Genero.prototype, "nombre", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => libro_model_1.Libro),
    __metadata("design:type", Array)
], Genero.prototype, "libros", void 0);
exports.Genero = Genero = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'generos', timestamps: false })
], Genero);
