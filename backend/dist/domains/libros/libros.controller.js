"use strict";
// src/domains/libros/libros.controller.ts
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
exports.LibrosController = void 0;
const common_1 = require("@nestjs/common");
const libros_service_1 = require("./libros.service");
const update_libro_dto_1 = require("./dto/update-libro.dto");
const swagger_1 = require("@nestjs/swagger");
const json2csv_1 = require("json2csv");
const create_libro_con_inventario_dto_1 = require("./dto/create-libro-con-inventario.dto");
const swagger_2 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
let LibrosController = class LibrosController {
    constructor(librosService) {
        this.librosService = librosService;
    }
    healthCheck() {
        return { status: 'ok' };
    }
    async exportToCsv(res) {
        const libros = await this.librosService.findAllWithRelations();
        const plainData = libros.map((libro) => ({
            id: libro.id,
            titulo: libro.titulo,
            precio: libro.precio,
            disponible: libro.disponible,
            autor: libro.autor?.nombre,
            editorial: libro.editorial?.nombre,
            genero: libro.genero?.nombre,
        }));
        const fields = ['id', 'titulo', 'precio', 'disponible', 'autor', 'editorial', 'genero'];
        const parser = new json2csv_1.Parser({ fields });
        const csv = parser.parse(plainData);
        res.header('Content-Type', 'text/csv');
        res.attachment('libros.csv');
        res.send(csv);
    }
    getAll(query) {
        return this.librosService.findAll(query);
    }
    // @Post()
    // @UseInterceptors(AnyFilesInterceptor())
    // @ApiOperation({ summary: 'Crear un libro con inventario inicial' })
    // @ApiResponse({ status: 201, description: 'Libro creado con inventario' })
    // @ApiBody({
    //   type: CreateLibroConInventarioDto,
    //   examples: {
    //     ejemplo: {
    //       summary: 'Ejemplo básico',
    //       value: {
    //         titulo: 'El arte del código limpio',
    //         precio: 450.0,
    //         disponible: true,
    //         autor_id: 1,
    //         editorial_id: 2,
    //         genero_id: 3,
    //         cantidad: 20,
    //         fecha: '2025-07-08T15:00:00Z',
    //       },
    //     },
    //   },
    // })
    getById(id) {
        return this.librosService.findOne(id);
    }
    update(id, updateLibroDto) {
        return this.librosService.update(id, updateLibroDto);
    }
    remove(id) {
        return this.librosService.remove(id);
    }
    create(file, dto) {
        if (file) {
            dto.imagen = file.filename;
        }
        return this.librosService.createWithInventory(dto);
    }
};
exports.LibrosController = LibrosController;
__decorate([
    (0, common_1.Get)('/health'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LibrosController.prototype, "healthCheck", null);
__decorate([
    (0, common_1.Get)('export/csv'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LibrosController.prototype, "exportToCsv", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar todos los libros con relaciones' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Libros encontrados' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], LibrosController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener un libro por ID' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], LibrosController.prototype, "getById", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar un libro' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_libro_dto_1.UpdateLibroDto]),
    __metadata("design:returntype", void 0)
], LibrosController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar un libro' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], LibrosController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('imagen', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const ext = (0, path_1.extname)(file.originalname);
                cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
            },
        }),
    })),
    (0, swagger_1.ApiOperation)({ summary: 'Crear un libro con inventario inicial' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Libro creado con inventario' }),
    (0, swagger_2.ApiBody)({
        type: create_libro_con_inventario_dto_1.CreateLibroConInventarioDto,
        description: 'Libro a crear',
    }),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_libro_con_inventario_dto_1.CreateLibroConInventarioDto]),
    __metadata("design:returntype", void 0)
], LibrosController.prototype, "create", null);
exports.LibrosController = LibrosController = __decorate([
    (0, swagger_1.ApiBearerAuth)('jwt'),
    (0, swagger_1.ApiTags)('Libros'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('libros'),
    __metadata("design:paramtypes", [libros_service_1.LibrosService])
], LibrosController);
