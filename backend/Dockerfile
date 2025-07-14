FROM node:18

WORKDIR /app

# 👇 Aseguramos que se instalen devDependencies también
ENV NODE_ENV=development

COPY package*.json ./

# 👇 Evitamos errores de peer dependencies
RUN npm install --legacy-peer-deps

# Nest CLI global solo si necesitás nest en CLI
RUN npm install -g @nestjs/cli

COPY . .

RUN npm run build

CMD ["npm", "run", "start:dev"]
