# Usar la imagen base de Node.js
FROM node:18

# Crear un directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copiar los archivos de tu proyecto al contenedor
COPY package*.json ./
COPY . .

# Instalar las dependencias
RUN npm install

# Exponer el puerto donde corre tu app
EXPOSE 3000

# Comando para iniciar el servidor
CMD ["npm", "start"]
