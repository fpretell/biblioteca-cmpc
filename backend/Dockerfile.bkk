FROM node:18-alpine

WORKDIR /app

# Instalar Nest CLI
RUN npm install -g @nestjs/cli

# Copiar e instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar código
COPY . .

# Compilar el proyecto
RUN npm run build

# Exponer puerto NestJS
EXPOSE 3000

# Correr app en modo producción
CMD ["npm", "run", "start:prod"]

