# Proyecto Play Group

Este es un proyecto que incluye un backend desarrollado con **Node.js, Express.js y PostgreSQL** y un frontend basado en **Vue 3 y Quasar Framework**.

## 🚀 Instalación y Configuración

### 📌 Backend

#### Requisitos previos
Antes de comenzar, asegúrate de tener instalados los siguientes programas:

- **Node.js** (versión 14 o superior)
- **PostgreSQL** (versión 12 o superior)

#### Pasos de instalación

1. **Clona el repositorio**
   ```sh
   git clone https://github.com/kevinmore26/play_group_proyect.git
   cd backend
   ```

2. **Crea el archivo de entorno** `.env` en la raíz del proyecto, basándote en el archivo `env.example`. Configura los valores correctamente:
   ```env
   DB_HOST_LOCAL=localhost
   DB_PORT=5432
   DB_NAME=playgroup_bd
   DB_USER=postgres
   DB_PASSWORD=your_password
   PORT=3000
   ```

3. **Instala las dependencias**
   ```sh
   npm install
   ```

4. **Inicializa la base de datos** ejecutando los siguientes comandos:
   ```sh
   npm run db:create
   npm run db:init
   ```

5. **Ejecuta el servidor en modo desarrollo**
   ```sh
   npm run dev
   ```

El backend estará disponible en `http://localhost:3000`, dependiendo del puerto configurado.

En el proyecto hay un script que se ejecuta automáticamente y crea productos de ejemplo. De igual manera, los productos podrán gestionarse desde el frontend.

---

### 🎨 Frontend

#### Requisitos previos
Antes de comenzar, asegúrate de tener instalados los siguientes programas:

- **Node.js** (versión 14 o superior)
- **Quasar CLI** (instalado globalmente)

Si no tienes instalado Quasar CLI, instálalo con:
```sh
npm install -g @quasar/cli
```

#### Pasos de instalación

1. **Clona el repositorio**
   ```sh
   git clone https://github.com/kevinmore26/play_group_proyect.git
   cd frontend
   ```

2. **Instala las dependencias**
   ```sh
   npm install
   ```

3. **Ejecuta el proyecto en modo desarrollo**
   ```sh
   quasar dev
   ```

El proyecto estará disponible en `http://localhost:9000`.

---

## 🛠 Tecnologías Utilizadas

- **Backend:** Node.js, Express.js, PostgreSQL
- **Frontend:** Vue 3, Quasar Framework


---

## 🎉 Contacto
Espero que este proyecto les sea útil y que podamos trabajar juntos.

¡Gracias de antemano!

📧 **Ivan More**

