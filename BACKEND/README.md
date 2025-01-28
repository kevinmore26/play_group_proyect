# Backend - CRUD de Productos

Este proyecto es un backend para gestionar productos con funcionalidades básicas de un CRUD. Está construido en **Node.js** con **Express** y utiliza **PostgreSQL** como base de datos.

---

## Requisitos

Antes de comenzar, asegúrate de tener instalados los siguientes programas:

- [Node.js](https://nodejs.org) (versión 14 o superior).
- [PostgreSQL](https://www.postgresql.org/) (versión 13 o superior).
- Un editor de texto o IDE (recomendado: [VS Code](https://code.visualstudio.com/)).

---

## Configuración del proyecto

### 1. Clona el repositorio

``` 
git clone <URL_DEL_REPOSITORIO>
cd backend
2. Instala las dependencias
 
  
   
npm install
3. Configura las variables de entorno
Crea un archivo .env en la raíz del proyecto y completa las variables de entorno basándote en el archivo env.example. Por ejemplo:

plaintext
  
   
DB_HOST_LOCAL=localhost
DB_PORT=5432
DB_NAME=playgroup_bd
DB_USER=postgres
DB_PASSWORD=tu_contraseña
PORT=3000
Asegúrate de reemplazar tu_contraseña con la contraseña de tu usuario de PostgreSQL.

Comandos disponibles
1. Crear la base de datos
Ejecuta el siguiente comando para crear la base de datos especificada en las variables de entorno (DB_NAME):

   
npm run db:create


2. Inicializar la base de datos

Esto creará las tablas necesarias y poblará la base de datos con datos de ejemplo.
  
npm run db:init


3. Reiniciar la base de datos (opcional)


Si necesitas reiniciar la base de datos desde cero (eliminándola y recreándola):

npm run db:reset


Ejecución del servidor
Modo desarrollo
Para iniciar el servidor en modo desarrollo (con recarga automática al realizar cambios en el código):


npm run dev


Modo producción
Para iniciar el servidor en modo producción:


npm start


El servidor estará disponible en http://localhost:3000 (o el puerto configurado en tu archivo .env).

Endpoints disponibles
Método	Endpoint	Descripción
GET	/productos	Obtiene todos los productos
GET	/productos/:id	Obtiene un producto por su ID
POST	/productos	Crea un nuevo producto
PUT	/productos/:id	Actualiza un producto existente
DELETE	/productos/:id	Elimina un producto


Notas importantes
La base de datos se inicializa con datos de ejemplo, incluyendo productos con imágenes y descripciones predeterminadas.
Si experimentas problemas al ejecutar los comandos de la base de datos, asegúrate de que las credenciales en .env sean correctas y que PostgreSQL esté corriendo en tu máquina.
Este backend no requiere Docker, pero se ha simplificado el proceso de configuración para trabajar directamente en tu entorno local.
Tambien funcionaría con docker, solo que en el proceso era algo complicado manejar o saltar de un modo a otro para testear, quise simplificar lo mayor posible el trabajo manual que requiera quien deba correr el proyecto, gracias!