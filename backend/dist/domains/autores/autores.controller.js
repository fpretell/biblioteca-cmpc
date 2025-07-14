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
exports.AutoresController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const autores_service_1 = require("./autores.service");
const create_autor_dto_1 = require("./dto/create-autor.dto");
const json2csv_1 = require("json2csv");
let AutoresController = class AutoresController {
    constructor(autoresService) {
        this.autoresService = autoresService;
    }
    create(dto) {
        return this.autoresService.create(dto);
    }
    findAll() {
        return this.autoresService.findAll();
    }
    findOne(id) {
        return this.autoresService.findOne(id);
    }
    remove(id) {
        return this.autoresService.remove(id);
    }
    async exportAutoresToCsv(res) {
        const data = await this.autoresService.exportToCsvData();
        const fields = ['id', 'nombre', 'cantidadLibros'];
        const parser = new json2csv_1.Parser({ fields });
        const csv = parser.parse(data);
        res.header('Content-Type', 'text/csv');
        res.attachment('autores.csv');
        res.send(csv);
    }
};
exports.AutoresController = AutoresController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_autor_dto_1.CreateAutorDto]),
    __metadata("design:returntype", void 0)
], AutoresController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AutoresController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AutoresController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AutoresController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('export/csv'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AutoresController.prototype, "exportAutoresToCsv", null);
exports.AutoresController = AutoresController = __decorate([
    (0, swagger_1.ApiTags)('Autores'),
    (0, common_1.Controller)('autores'),
    __metadata("design:paramtypes", [autores_service_1.AutoresService])
], AutoresController);
