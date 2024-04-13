El programa ProductManager se enfoca en la gestión de un catálogo de productos como objetos. En el archivo ProductManager.js, creamos la clase principal que incluye las siguientes funciones:

AGREGAR Productos
OBTENER TODOS los Productos
OBTENER Productos por ID
ACTUALIZAR Productos por ID
ELIMINAR Productos por ID
El catálogo de productos se guarda en un archivo llamado products.json. La clase se importa para permitir múltiples solicitudes desde un servidor externo.

En el servidor app.js, hacemos referencia al archivo que contiene la clase y las funciones principales (ProductManager.js) mediante los métodos GET y GETBYIDD. Desde aquí, podemos solicitar todos los PRODUCTOS, filtrarlos por ID o establecer una cantidad específica para visualizar en pantalla.
