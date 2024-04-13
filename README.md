# Servidores web & Express avanzado

El proyecto de ProductManager se enfoca en la gestión de un catálogo de productos como objetos.
En el archivo `ProductManager.js`, creamos la clase principal que incluye las siguientes funciones:
  - AGREGAR Productos
  - OBTENER TODOS los Productos
  - OBTENER Productos por ID
  - ACTUALIZAR Productos por ID
  - ELIMINAR Productos por ID

El catálogo de productos se guarda en un archivo llamado `products.json`. 
La clase se importa para permitir múltiples solicitudes desde un servidor externo.

En el servidor `app.js`, hacemos referencia al archivo que contiene la clase y las funciones principales (`ProductManager.js`) mediante los métodos `GET` y `GETBYID`. Desde aquí, solicitamos todos los Productos, podemos filtrarlos por ID o establecer una cantidad específica para visualizar en pantalla.

## Pasos para ejecutar el proyecto:
1. Clona este repositorio en tu máquina local (node.js instalado).
2. Navega hasta el directorio `ProductManager - 3ra entrega`.
3. Ejecuta los siguientes comandos desde un CMD para compilar el proyecto:
    - Instala las dependencias a partir del comando `npm install <nodemon - express>`
    - Ejecutar `npm run dev` para comenzar con el Testeo del aplicativo.
    - Abrir una pagina web `http://localhost:8080/products` para realizar los queries correspondientes:
      * `http://localhost:8080/products`: respondera con todos los productos en catalogo.
      * `http://localhost:8080/products?list=5` respondera con solo los primeros 5 productos en catalogo.
      * `http://localhost:8080/products?list=0` respondera con todos los productos en catalogo.
      * `http://localhost:8080/products/2` respondera con el producto ID = 2 en catalogo.
      * `http://localhost:8080/products/15` respondera con un error (solo hay 10 productos en el catalogo).
    - Desde un POSTMAN contiene la posibilidad de agregar Productos mediante lo siguiente:
      * Body < Raw < JSON:
      * Producto: {
         "title":"Llavero",
         "description":"Azul",
         "thumbnail": "https://www.google.com",
         "price": null,
         "code":"adf121", 
         "stock": 100
        }
      
## Estructura de directorios
- `data/`: Este directorio contiene la ubicacion donde se crea el archivo "products.json" que los datos utilizados en el proyecto.
- `ProductManager.js`: Aquí se encuentra el código fuente del módulo ProductManager.
- `apps.js` este archivo contiene el servidor web/express desde el que se ejecute el localhost por el puerto 8080.
- `package.json` contiene la información sobre el proecto, como el nombre, la versión, las dependencias requeridas, los scripts de ejecución y la licencia. Es fundamental para la gestión y el funcionamiento del proyecto en el ecosistema de Node.js.

