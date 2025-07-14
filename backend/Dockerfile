# Usa imagen oficial de Node
FROM node:18

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia solo los archivos necesarios para instalar deps
COPY package*.json ./

# Instala dependencias (usa --legacy-peer-deps para resolver conflictos)
RUN npm install --legacy-peer-deps

# Copia el resto del código fuente
COPY . .

# Compila el proyecto
RUN npm run build

# Usa npx para levantar NestJS en modo dev
CMD ["npx", "nest", "start", "--watch"]
