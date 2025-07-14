# Usa Node oficial
FROM node:18

# Crear directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# ✅ Instalá TODO (prod + dev)
RUN npm install --legacy-peer-deps

# Copiar el resto
COPY . .

# Compilar
RUN npm run build

#CMD ["npm", "run", "start:prod"]
CMD ["npx", "nest", "start", "--watch"]


