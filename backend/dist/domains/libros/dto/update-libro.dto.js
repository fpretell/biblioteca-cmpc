"use strict";
// src/domains/libros/dto/update-libro.dto.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateLibroDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_libro_dto_1 = require("./create-libro.dto");
class UpdateLibroDto extends (0, mapped_types_1.PartialType)(create_libro_dto_1.CreateLibroDto) {
}
exports.UpdateLibroDto = UpdateLibroDto;
