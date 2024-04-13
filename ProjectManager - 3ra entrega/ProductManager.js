//Se declara modulo de FYLESYSTEM:
const fs = require("fs");

// Se declara la clase PRODUCT MANAGER:
class ProductManager {
  // Se declara el constructor:
  constructor() {
    // Se declara arreglo vacio de PRODUCTOS:
    this.products = [];
    this.pathfile = "./data/products.json";
  }

  // Se declara funcion para añadir productos:
  addProducts = async (title, description, price, thumbnail, code, stock) => {
    // TRY/CATCH para validar que el archivo JSON no este vacio:
    try {
      const content = await fs.promises.readFile(this.pathfile, "utf-8"); // Se lee el archivo con FS y promesa.
      this.products = JSON.parse(content); // Se realiza PARSE para corregir el formato de JSON a ARRAY.

      // Se declara el nuevo OBJETO con sus atributos:
      const newProduct = {
        id: this.products.length + 1,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };

      const productExist = this.products.find((p) => p.code === code); // Operacion para encontrar un codigo repetido:

      const productUndefined = Object.values(newProduct).some(
        (value) => value === undefined
      ); //Operacion para encontrar cualquier valor de la lista de productos que tenga un valor UNDEFINED:

      // Se filtra que no tenga valores UNDEFINED:
      let erroresDeLogica;
      if (productUndefined) {
        erroresDeLogica = `Te faltan parametros para este Producto con el TITULO: ${title}`;
        throw new Error(erroresDeLogica);
      } else {
        //Se filtra si hay valor CODE repetido:
        if (productExist) {
          erroresDeLogica = `Ya existe el Producto con el CODIGO: ${code}`;
          throw new Error(erroresDeLogica);
        } else {
          this.products.push(newProduct);
          await fs.promises.writeFile(
            this.pathfile,
            JSON.stringify(this.products)
          ); // Se agrega Nuevo Producto al ARREGLO.
          return newProduct;
        }
      }
      // Se sobrescribe el ARREGLO hacia el documento JSON.
    } catch (error) {
      this.products = [];
      return error.message;
    }
  };

  // Se declara funcion para obtener toda la lista:
  getProducts = async (limit) => {
    // TRY/CATCH para validar que el archivo JSON no este vacio:
    try {
      const productsJSON = await fs.promises.readFile(this.pathfile, "utf-8");
      if (productsJSON) {
        this.products = JSON.parse(productsJSON);
        limit && (this.products = this.products.slice(0, limit));
        return this.products;
      } else {
        this.products = [];
        throw new Error("Sin Productos en el Catalago.");
      }
    } catch (error) {
      return error.message;
    }
  };

  // Se declara funcion para obtener productos por ID:
  getProductByID = async (id) => {
    // TRY/CATCH para validar que el archivo JSON no este vacio:
    try {
      const productsJSON = await fs.promises.readFile(this.pathfile, "utf-8");
      this.products = JSON.parse(productsJSON);
      const productExist = this.products.find((p) => p.id === id); //Operacion para devolver el procucto con ID a una variable.
      let erroresDeLogica;
      if (!productExist) {
        erroresDeLogica = `No existe el producto con el ID: ${id}`;
        throw new Error(erroresDeLogica);
      } else {
        return productExist;
      }
    } catch (error) {
      return error.message;
    }
  };

  // Se declara funcion para modificar productos por ID:
  updateProduct = async (id, dataProduct) => {
    const index = this.products.findIndex((p) => p.id === id); // Se busca el INDEX del producto que coincida con parametro ID.

    if (index < 0) {
      console.log(
        `--No existe el producto con el ID: ${id} para modificacion.`
      );
    } else {
      dataProduct.id = id; // Se rescribe el ID para que no cambie:

      this.products[index] = {
        ...this.products[index],
        ...dataProduct,
      };
      await fs.promises.writeFile(this.pathfile, JSON.stringify(this.products)); // Se sobrescribe el ARREGLO hacia el documento JSON.
      console.log(
        "----------------------------------------------\nPRODUCTO MODIFICADO:\n",
        this.products[index],
        "\n----------------------------------------------"
      );
    }
  };

  // Se declara funcion para eliminar productos por ID:
  deleteProduct = async (id) => {
    const productExist = this.products.find((p) => p.id === id); // Se busca que el que el producto a eliminar exista (para log de error).
    if (!productExist) {
      console.log(`--No existe el producto con el ID: ${id}`);
      return;
    } else {
      this.products = this.products.filter((p) => p.id !== id); // Funcion para FILTRAR (quitar) todo lo diferente al ID del parametro.
      await fs.promises.writeFile(this.pathfile, JSON.stringify(this.products)); // Se sobrescribe el ARREGLO hacia el documento JSON.
      console.log(
        "----------------------------------------------\nPRODUCTOS RESTANTES:\n",
        this.products,
        "\n----------------------------------------------"
      );
    }
  };
}

// pMANAGER = new ProductManager(); // Se declara variable con la clase.

// Se crea la funcion para que se declaren las funciones asincronas.
const funcionesAsincronas = async () => {
  // Se solicitan todos los productos:
  // await pMANAGER.getProducts();

  // Se solicitan los productos por ID
  await pMANAGER.getProductByID(1);

  // Se modifican los productos por ID:
  // await pMANAGER.updateProduct(2, {
  //   id: 999, // No se podra modificar
  //   title: "Chamarra", // Solo se modifica el Title.
  //   price: 199,
  // });

  // Se elimina el producto por ID:
  //   await pMANAGER.deleteProduct(3); // Se elimina el producto con ID 3.
};

// funcionesAsincronas(); // EJECUCION DE FUNCIONES ASINCRONAS.

const productManager = new ProductManager();
module.exports = productManager;
