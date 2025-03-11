const express = require("express");
const { uploadMiddleware } = require("../middleware/uploadProducts");
const {
  createProduct,
  updateProduct,
} = require("../controller/productController");
const { getProducts } = require("../services/productcrud");
const routes = express.Router();

routes.post("/products", uploadMiddleware, createProduct);
routes.get("/products", getProducts);
routes.patch("/products/:id", updateProduct);
module.exports = routes;
