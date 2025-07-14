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
exports.Inventario = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const libro_model_1 = require("../../libros/entities/libro.model");
let Inventario = class Inventario extends sequelize_typescript_1.Model {
};
exports.Inventario = Inventario;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => libro_model_1.Libro),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], Inventario.prototype, "libro_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], Inventario.prototype, "cantidad", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: false,
        defaultValue: sequelize_typescript_1.DataType.NOW,
    }),
    __metadata("design:type", Date)
], Inventario.prototype, "fecha", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => libro_model_1.Libro),
    __metadata("design:type", libro_model_1.Libro)
], Inventario.prototype, "libro", void 0);
exports.Inventario = Inventario = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'inventario',
        timestamps: true,
        createdAt: 'fecha',
        updatedAt: false,
    })
], Inventario);
