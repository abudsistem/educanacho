# nachoeduca - Backend

Este repositorio contiene el código fuente del backend para la plataforma nachoeduca, construido con Node.js y Express.

## Descripción

nachoeduca es una plataforma educativa en línea diseñada para proporcionar recursos de aprendizaje interactivos y conectar a estudiantes con tutores. Este backend, desarrollado con Node.js y Express, proporciona la lógica del servidor, la gestión de la base de datos y las APIs necesarias para el funcionamiento de la plataforma.

## Tecnologías Utilizadas

* **Node.js**: Entorno de ejecución de JavaScript del lado del servidor.
* **Express**: Framework web de Node.js para construir APIs y aplicaciones web.
* **Mongoose**: Librería de modelado de objetos MongoDB para Node.js.
* **JSON Web Token (JWT)**: Para la autenticación y autorización de usuarios.
* **bcrypt**: Para el hash seguro de contraseñas.
* **cors**: Middleware para habilitar el Cross-Origin Resource Sharing (CORS).
* **dotenv**: Para cargar variables de entorno desde un archivo `.env`.
* **zod**: Para la validación de esquemas de datos.
* **compression**: Middleware para comprimir las respuestas HTTP y mejorar el rendimiento.
* **nodemon**: Para reiniciar automáticamente el servidor durante el desarrollo.

## Requisitos Previos

Asegúrate de tener instalado lo siguiente en tu sistema:

* Node.js (versión 14 o superior)
* npm (o yarn)
* MongoDB (si utilizas MongoDB como base de datos)

## Instalación

1.  Clona el repositorio:

    ```bash
    git clone [https://github.com/abudsistem/nachoeduca-backend.git](https://github.com/abudsistem/nachoeduca-backend.git)
    ```

2.  Navega al directorio del proyecto:

    ```bash
    cd nachoeduca-backend
    ```

3.  Instala las dependencias:

    ```bash
    npm install
    # o si usas yarn
    yarn install
    ```

4.  Crea un archivo `.env` en la raíz del proyecto y configura las variables de entorno necesarias (por ejemplo, la URL de la base de datos, las claves secretas, etc.).

## Ejecución

Para ejecutar el servidor de desarrollo, utiliza el siguiente comando:

```bash
npm run dev
# o yarn dev