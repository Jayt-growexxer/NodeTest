const express = require("express");

const { reviewProduct } = require("../controller/reviewController");

const routes = express.Router();

routes.post("/products/:id/reviews", reviewProduct);
// routes.put("/products/:id", updateProduct);
module.exports = routes;
