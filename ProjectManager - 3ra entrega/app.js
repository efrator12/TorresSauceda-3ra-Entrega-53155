const express = require("express");
const productManager = require("./ProductManager.js");
const { error } = require("console");
const send = require("send");

// Para crear una aplicacion:
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Para inicializar la APP de EXPRESS se necesita configurar puerto:
const port = 8080;
const ready = console.log("server ready on port " + port);

// Para inicializar el servidor:
app.listen(port, ready);

app.get("/", (req, resp) => {
  try {
    const message = "Bienvenido a ProductManager";
    return resp.json({ status: 200, response: message });
  } catch (error) {
    return resp.json({ status: 404, response: "ERROR: " + error });
  }
});

const getProduct = async (req, resp) => {
  try {
    let { limit } = req.query;
    limit = parseInt(limit);
    const products = await productManager.getProducts(limit);
    if ((products.length > 0) & (typeof products !== "string")) {
      return resp.json({ status: 200, response: products });
    } else {
      throw new Error(products);
    }
  } catch (error) {
    // console.log(error);
    return resp.json({ status: 404, response: "ERROR: " + error.message });
  }
};

const getByID = async (req, resp) => {
  try {
    const { pid } = req.params;
    const product = await productManager.getProductByID(parseInt(pid));
    if (typeof product === "object") {
      return resp.json({ status: 200, response: product });
    } else {
      throw new Error(product);
    }
  } catch (error) {
    return resp.json({ status: 404, response: "ERROR: " + error.message });
  }
};

const addProduct = async (req, resp) => {
  try {
    const { title, description, price, thumbnail, code, stock } = req.body;
    const product = await productManager.addProducts(
      title,
      description,
      price,
      thumbnail,
      code,
      stock
    );
    if (typeof product === "object") {
      return resp.json({ status: 201, response: product });
    } else {
      return resp.json({
        status: 404,
        response: "Error al AGREGAR Producto: " + product,
      });
    }
  } catch (error) {
    console.log(error);
    return resp.json({ status: 404, response: "ERROR: " + error });
  }
};

app.get("/products", getProduct);
app.get("/products/:pid", getByID);
app.post("/products", addProduct);
