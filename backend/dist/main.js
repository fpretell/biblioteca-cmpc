"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const all_exceptions_filter_1 = require("./common/filters/all-exceptions.filter");
const express = __importStar(require("express"));
const path = __importStar(require("path"));
async function bootstrap() {
    // const app = await NestFactory.create(AppModule);
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    // ✅ Pipes globales de validación
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    // ✅ Filtros Globales Errores
    app.useGlobalFilters(new all_exceptions_filter_1.AllExceptionsFilter());
    // Prefijo Globla
    app.setGlobalPrefix('api/v1');
    // ✅ Swagger config
    const config = new swagger_1.DocumentBuilder()
        .setTitle('CMPC Libros API')
        // .setDescription('Documentación Swagger de la API de CMPC Libros')
        .setDescription(`
    API para la gestión de libros.

    **🔐 Autenticación**
    - Para probar los endpoints protegidos, usá el endpoint \`/auth/login\` con este usuario precargado:
      - Email: \`admin@example.com\`
      - Contraseña: \`123456\`
      Usa este JSON en el endpoint \`/auth/login\`:

      {
        "email": "admin@example.com",
        "password": "123456"
      }

    - Copiá el token de la respuesta y hacé click en "Authorize" arriba a la derecha para usarlo.

    - También podés registrar nuevos usuarios con \`/auth/register\`.
    `)
        .setVersion('1.0')
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        in: 'header',
    }, 'jwt')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/v1/docs', app, document); // ⬅ Swagger bajo mismo prefijo
    app.enableCors({
        origin: 'http://localhost:3001',
        credentials: true,
    });
    // imageness estaticas uploads
    app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
