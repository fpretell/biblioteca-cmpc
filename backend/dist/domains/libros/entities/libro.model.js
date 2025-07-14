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
exports.Libro = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const autor_model_1 = require("../../autores/entities/autor.model");
const editorial_model_1 = require("../../editoriales/entities/editorial.model");
const genero_model_1 = require("../../generos/entities/genero.model");
let Libro = class Libro extends sequelize_typescript_1.Model {
};
exports.Libro = Libro;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Libro.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Libro.prototype, "titulo", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DECIMAL(10, 2)),
    __metadata("design:type", Number)
], Libro.prototype, "precio", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.BOOLEAN),
    __metadata("design:type", Boolean)
], Libro.prototype, "disponible", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => autor_model_1.Autor),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Libro.prototype, "autor_id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => editorial_model_1.Editorial),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Libro.prototype, "editorial_id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => genero_model_1.Genero),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Libro.prototype, "genero_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => autor_model_1.Autor),
    __metadata("design:type", autor_model_1.Autor)
], Libro.prototype, "autor", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => editorial_model_1.Editorial),
    __metadata("design:type", editorial_model_1.Editorial)
], Libro.prototype, "editorial", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => genero_model_1.Genero),
    __metadata("design:type", genero_model_1.Genero)
], Libro.prototype, "genero", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    (0, sequelize_typescript_1.Column)({ field: 'created_at' }),
    __metadata("design:type", Date)
], Libro.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    (0, sequelize_typescript_1.Column)({ field: 'updated_at' }),
    __metadata("design:type", Date)
], Libro.prototype, "updatedAt", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Libro.prototype, "imagen", void 0);
__decorate([
    sequelize_typescript_1.DeletedAt,
    (0, sequelize_typescript_1.Column)({
        field: 'deleted_at',
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: true,
    }),
    __metadata("design:type", Date)
], Libro.prototype, "deletedAt", void 0);
exports.Libro = Libro = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'libros', paranoid: true, timestamps: true })
], Libro);
