const Review = require("../models/reviewSchema");
const Product = require("../models/productSchema");
const { errorHandler, responseMessage } = require("../utils/errorHandler");

exports.reviewCreate = async (productId, rating, comment, res) => {
  try {
    const productExists = await Product.exists({ _id: productId });
    if (!productExists) throw new Error("Product not found");

    const review = await Review.create({ productId, rating, comment });

    return responseMessage(res, 201, review, "Review added successfully", true);
  } catch (error) {
    return errorHandler(error, res);
  }
};
