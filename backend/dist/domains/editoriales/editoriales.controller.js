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
exports.EditorialesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const editoriales_service_1 = require("./editoriales.service");
const create_editorial_dto_1 = require("./dto/create-editorial.dto");
let EditorialesController = class EditorialesController {
    constructor(editorialesService) {
        this.editorialesService = editorialesService;
    }
    create(dto) {
        return this.editorialesService.create(dto);
    }
    findAll() {
        return this.editorialesService.findAll();
    }
    findOne(id) {
        return this.editorialesService.findOne(id);
    }
    remove(id) {
        return this.editorialesService.remove(id);
    }
};
exports.EditorialesController = EditorialesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_editorial_dto_1.CreateEditorialDto]),
    __metadata("design:returntype", void 0)
], EditorialesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EditorialesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], EditorialesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], EditorialesController.prototype, "remove", null);
exports.EditorialesController = EditorialesController = __decorate([
    (0, swagger_1.ApiTags)('Editoriales'),
    (0, common_1.Controller)('editoriales'),
    __metadata("design:paramtypes", [editoriales_service_1.EditorialesService])
], EditorialesController);
