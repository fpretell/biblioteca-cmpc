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
exports.LibrosService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const libro_model_1 = require("./entities/libro.model");
const sequelize_typescript_1 = require("sequelize-typescript");
const inventario_model_1 = require("../inventario/entities/inventario.model");
const auditoria_model_1 = require("../auditoria/entities/auditoria.model");
const sequelize_2 = require("sequelize");
const autor_model_1 = require("../autores/entities/autor.model");
const editorial_model_1 = require("../editoriales/entities/editorial.model");
const genero_model_1 = require("../generos/entities/genero.model");
let LibrosService = class LibrosService {
    constructor(sequelize, libroModel, autorModel, inventarioModel, auditoriaModel) {
        this.sequelize = sequelize;
        this.libroModel = libroModel;
        this.autorModel = autorModel;
        this.inventarioModel = inventarioModel;
        this.auditoriaModel = auditoriaModel;
    }
    async findAll(query) {
        const where = {};
        const order = [];
        // Filtro por disponibilidad
        if (query.disponible !== undefined) {
            where.disponible = query.disponible === 'true';
        }
        // Filtro por género
        if (query.genero_id) {
            where.genero_id = +query.genero_id;
        }
        // ✅ Filtro por editorial
        if (query.editorial_id) {
            where.editorial_id = +query.editorial_id;
        }
        // ✅ Filtro por autor
        if (query.autor_id) {
            where.autor_id = +query.autor_id;
        }
        // Búsqueda por título
        if (query.search) {
            where.titulo = { [sequelize_2.Op.iLike]: `%${query.search}%` };
        }
        // Ordenamiento múltiple dinámico
        if (query.order) {
            const fields = query.order.split(',');
            for (const field of fields) {
                const [key, direction] = field.split(':');
                if (key && direction && ['asc', 'desc'].includes(direction.toLowerCase())) {
                    const dir = direction.toUpperCase();
                    if (key === 'editorial') {
                        order.push([{ model: editorial_model_1.Editorial, as: 'editorial' }, 'nombre', dir]);
                    }
                    else if (key === 'genero') {
                        order.push([{ model: genero_model_1.Genero, as: 'genero' }, 'nombre', dir]);
                    }
                    else if (key === 'autor') {
                        order.push([{ model: autor_model_1.Autor, as: 'autor' }, 'nombre', dir]);
                    }
                    else {
                        // Orden por columna directa de libro
                        order.push([key, dir]);
                    }
                }
            }
        }
        else {
            order.push(['id', 'ASC']);
        }
        const page = parseInt(query.page) || 1;
        const limit = parseInt(query.limit) || 10;
        const offset = (page - 1) * limit;
        const { rows, count } = await this.libroModel.findAndCountAll({
            where,
            order,
            limit,
            offset,
            include: [
                { model: autor_model_1.Autor, attributes: ['id', 'nombre'] },
                { model: editorial_model_1.Editorial, attributes: ['id', 'nombre'] },
                { model: genero_model_1.Genero, attributes: ['id', 'nombre'] },
            ],
        });
        return {
            libros: rows,
            total: count,
            page,
            totalPages: Math.ceil(count / limit),
        };
    }
    async findOne(id) {
        const libro = await this.libroModel.findByPk(id);
        if (!libro)
            throw new common_1.NotFoundException(`Libro con ID ${id} no encontrado`);
        return libro;
    }
    async update(id, updateDto) {
        const transaction = await this.sequelize.transaction();
        try {
            const libro = await this.findOne(id);
            const datosPrevios = libro.toJSON();
            const libroActualizado = await libro.update(updateDto, { transaction });
            const auditoriaData = {
                entidad: 'libros',
                operacion: 'update',
                registro_id: id,
                datos_previos: datosPrevios,
                datos_nuevos: libroActualizado.toJSON(),
            };
            const auditoriaInstance = this.auditoriaModel.build(auditoriaData);
            await auditoriaInstance.save({ transaction });
            await transaction.commit();
            return libroActualizado;
        }
        catch (error) {
            await transaction.rollback();
            throw new common_1.InternalServerErrorException('Error al actualizar el libro');
        }
    }
    async remove(id) {
        const transaction = await this.sequelize.transaction();
        try {
            const libro = await this.findOne(id);
            const datosPrevios = libro.toJSON();
            await this.libroModel.destroy({ where: { id }, transaction });
            const auditoriaData = {
                entidad: 'libros',
                operacion: 'delete',
                registro_id: id,
                datos_previos: datosPrevios,
                datos_nuevos: null,
            };
            const auditoriaInstance = this.auditoriaModel.build(auditoriaData);
            await auditoriaInstance.save({ transaction });
            await transaction.commit();
        }
        catch (error) {
            await transaction.rollback();
            throw new common_1.InternalServerErrorException('Error al eliminar el libro');
        }
    }
    create(createLibroDto) {
        return this.libroModel.create(createLibroDto);
    }
    async findAllWithRelations() {
        return this.libroModel.findAll({
            include: ['autor', 'editorial', 'genero'],
        });
    }
    async createWithInventory(dto) {
        const transaction = await this.sequelize.transaction();
        try {
            const { titulo, precio, disponible, autor_id, editorial_id, genero_id, imagen, // ✅ imagen es requerido
            cantidad, fecha, } = dto;
            const libro = await this.libroModel.create({
                titulo,
                precio,
                disponible,
                autor_id,
                editorial_id,
                genero_id,
                imagen, // ✅ guardar imagen en la BD
            }, { transaction });
            await this.inventarioModel.create({
                libro_id: libro.id,
                cantidad,
                fecha: fecha || new Date(),
            }, { transaction });
            const auditoriaData = {
                entidad: 'libros',
                operacion: 'create',
                registro_id: libro.id,
                datos_previos: null,
                datos_nuevos: libro.toJSON(),
            };
            const auditoriaInstance = this.auditoriaModel.build(auditoriaData);
            await auditoriaInstance.save({ transaction });
            await transaction.commit();
            return libro;
        }
        catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
};
exports.LibrosService = LibrosService;
exports.LibrosService = LibrosService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, sequelize_1.InjectModel)(libro_model_1.Libro)),
    __param(2, (0, sequelize_1.InjectModel)(autor_model_1.Autor)),
    __param(3, (0, sequelize_1.InjectModel)(inventario_model_1.Inventario)),
    __param(4, (0, sequelize_1.InjectModel)(auditoria_model_1.Auditoria)),
    __metadata("design:paramtypes", [sequelize_typescript_1.Sequelize, Object, Object, Object, Object])
], LibrosService);
