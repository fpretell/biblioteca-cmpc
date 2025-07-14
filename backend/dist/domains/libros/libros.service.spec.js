"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const sequelize_typescript_1 = require("sequelize-typescript");
const sequelize_1 = require("@nestjs/sequelize");
const libros_service_1 = require("./libros.service");
const libro_model_1 = require("./entities/libro.model");
const inventario_model_1 = require("../inventario/entities/inventario.model");
const auditoria_model_1 = require("../auditoria/entities/auditoria.model");
const autor_model_1 = require("../autores/entities/autor.model");
const editorial_model_1 = require("../editoriales/entities/editorial.model");
const genero_model_1 = require("../generos/entities/genero.model");
describe('LibrosService', () => {
    let service;
    let sequelize;
    beforeAll(async () => {
        const module = await testing_1.Test.createTestingModule({
            imports: [
                sequelize_1.SequelizeModule.forRoot({
                    dialect: 'sqlite',
                    storage: ':memory:',
                    logging: false,
                    models: [libro_model_1.Libro, inventario_model_1.Inventario, auditoria_model_1.Auditoria, autor_model_1.Autor, editorial_model_1.Editorial, genero_model_1.Genero],
                    synchronize: true,
                }),
                sequelize_1.SequelizeModule.forFeature([libro_model_1.Libro, inventario_model_1.Inventario, auditoria_model_1.Auditoria]),
            ],
            providers: [libros_service_1.LibrosService],
        }).compile();
        service = module.get(libros_service_1.LibrosService);
        sequelize = module.get(sequelize_typescript_1.Sequelize);
        await sequelize.sync({ force: true });
        // Crear registros necesarios para las claves foráneas
        await autor_model_1.Autor.create({ id: 1, nombre: 'Autor Test' });
        await editorial_model_1.Editorial.create({ id: 1, nombre: 'Editorial Test' });
        await genero_model_1.Genero.create({ id: 1, nombre: 'Genero Test' });
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    it('createWithInventory should create libro with inventario and auditoria', async () => {
        const dto = {
            titulo: 'Libro Test',
            precio: 123.45,
            disponible: true,
            autor_id: 1,
            editorial_id: 1,
            genero_id: 1,
            cantidad: 10,
            fecha: new Date(),
            imagen: 'imagen.jpg',
        };
        const libro = await service.createWithInventory(dto);
        expect(libro).toBeDefined();
        expect(libro.titulo).toBe(dto.titulo);
        // Opcional: verificar inventario
        const inventario = await inventario_model_1.Inventario.findOne({ where: { libro_id: libro.id } });
        expect(inventario).toBeDefined();
        expect(inventario?.cantidad).toBe(dto.cantidad);
        // Opcional: verificar auditoría
        const auditoria = await auditoria_model_1.Auditoria.findOne({ where: { registro_id: libro.id, entidad: 'libros' } });
        expect(auditoria).toBeDefined();
        expect(auditoria?.operacion).toBe('create');
    });
    it('findAll should return array of libros', async () => {
        const libros = await service.findAll({});
        expect(Array.isArray(libros)).toBe(true);
        // expect(libros.length).toBeGreaterThan(0);
        expect(libros.libros.length).toBeGreaterThan(0);
    });
    it('findOne should return a single libro', async () => {
        const all = await service.findAll({});
        const libro = await service.findOne(all[0].id);
        expect(libro).toBeDefined();
        expect(libro.id).toBe(all[0].id);
    });
    it('update should modify an existing libro', async () => {
        const all = await service.findAll({});
        const updated = await service.update(all[0].id, {
            titulo: 'Nuevo Titulo',
            precio: 999,
            disponible: false,
        });
        expect(updated.titulo).toBe('Nuevo Titulo');
        expect(updated.precio).toBe(999);
        expect(updated.disponible).toBe(false);
    });
    it('remove should delete an existing libro', async () => {
        const libro = await service.createWithInventory({
            titulo: 'Libro para borrar',
            precio: 10,
            disponible: true,
            autor_id: 1,
            editorial_id: 1,
            genero_id: 1,
            cantidad: 5,
            imagen: 'imagen-ejemplo.jpg', // 👈 AGREGAR ESTO
            fecha: new Date(),
        });
        await service.remove(libro.id);
        await expect(service.findOne(libro.id)).rejects.toThrowError('Libro con ID ' + libro.id + ' no encontrado');
    });
});
