"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const libros_controller_1 = require("./libros.controller");
const libros_service_1 = require("./libros.service");
describe('LibrosController', () => {
    let controller;
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [libros_controller_1.LibrosController],
            providers: [
                {
                    provide: libros_service_1.LibrosService,
                    useValue: {
                        findOne: jest.fn(),
                        remove: jest.fn(),
                        update: jest.fn(),
                    },
                },
            ],
        }).compile();
        controller = module.get(libros_controller_1.LibrosController);
        service = module.get(libros_service_1.LibrosService);
    });
    describe('getById', () => {
        it('debería retornar un libro por id', async () => {
            const libroMock = {
                id: 1,
                titulo: 'Test Libro',
                precio: 100,
                disponible: true,
                autor_id: 1,
                editorial_id: 1,
                genero_id: 1,
            };
            jest.spyOn(service, 'findOne').mockResolvedValue(libroMock);
            const result = await controller.getById(1);
            expect(result).toBe(libroMock);
            expect(service.findOne).toHaveBeenCalledWith(1);
        });
    });
    describe('remove', () => {
        it('debería eliminar un libro existente', async () => {
            jest.spyOn(service, 'remove').mockResolvedValue(undefined);
            await controller.remove(1);
            expect(service.remove).toHaveBeenCalledWith(1);
        });
    });
    describe('update', () => {
        it('debería actualizar un libro existente', async () => {
            const updateDto = { titulo: 'Libro actualizado' };
            const libroMock = {
                id: 1,
                titulo: updateDto.titulo,
                precio: 100,
                disponible: true,
                autor_id: 1,
                editorial_id: 1,
                genero_id: 1,
            };
            jest.spyOn(service, 'update').mockResolvedValue(libroMock);
            const result = await controller.update(1, updateDto);
            expect(result).toBe(libroMock);
            expect(service.update).toHaveBeenCalledWith(1, updateDto);
        });
    });
});
