const {
  createProduct,
  getProducts,
  updateProductService,
} = require("../services/productcrud.js");

const { errorHandler, responseMessage } = require("../utils/errorHandler");

exports.createProduct = async (req, res) => {
  try {
    const product = await createProduct(req.body, req.files);
    return responseMessage(
      res,
      201,
      product,
      "Product created successfully",
      true
    );
  } catch (error) {
    return errorHandler(error, res);
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await updateProductService(req.params.id, req.body);
    return responseMessage(
      res,
      200,
      product,
      "Product updated successfully",
      true
    );
  } catch (error) {
    return errorHandler(error, res);
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await getProducts(req.query);
    return responseMessage(
      res,
      200,
      products,
      "Products fetched successfully",
      true
    );
  } catch (error) {
    return errorHandler(error, res);
  }
};
