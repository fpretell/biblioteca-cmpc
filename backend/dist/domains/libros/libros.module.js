"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LibrosModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const libro_model_1 = require("./entities/libro.model");
const libros_service_1 = require("./libros.service");
const libros_controller_1 = require("./libros.controller");
const inventario_model_1 = require("../inventario/entities/inventario.model");
const auditoria_model_1 = require("../auditoria/entities/auditoria.model");
const autor_model_1 = require("../autores/entities/autor.model");
const editorial_model_1 = require("../editoriales/entities/editorial.model");
const genero_model_1 = require("../generos/entities/genero.model");
let LibrosModule = class LibrosModule {
};
exports.LibrosModule = LibrosModule;
exports.LibrosModule = LibrosModule = __decorate([
    (0, common_1.Module)({
        imports: [
            sequelize_1.SequelizeModule.forFeature([libro_model_1.Libro, autor_model_1.Autor, editorial_model_1.Editorial, genero_model_1.Genero, inventario_model_1.Inventario, auditoria_model_1.Auditoria]),
            sequelize_1.SequelizeModule
        ],
        providers: [libros_service_1.LibrosService],
        controllers: [libros_controller_1.LibrosController],
    })
], LibrosModule);
