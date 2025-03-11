const Product = require("../models/productSchema");
const Review = require("../models/reviewSchema");
const { errorHandler, responseMessage } = require("../utils/errorHandler");

exports.createProduct = async (data, files, res) => {
  try {
    if (!files || files.length === 0)
      throw new Error("At least one image is required.");

    if (
      !data.name ||
      !data.description ||
      !data.price ||
      !data.category ||
      !data.stocks
    ) {
      throw new Error(
        "All fields (name, description, price, category, stocks) are required."
      );
    }
    if (data.name.length > 100)
      throw new Error("Product name must not exceed 100 characters.");
    if (isNaN(data.price) || data.price <= 0)
      throw new Error("Price must be a positive number.");
    if (isNaN(data.stocks) || data.stocks <= 0)
      throw new Error("Stocks must be a positive number.");

    const imagePaths = files.map((file) => file.path);

    const product = await Product.create({
      name: data.name,
      description: data.description,
      price: data.price,
      category: data.category,
      images: imagePaths,
      stocks: data.stocks,
    });

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

exports.updateProductService = async (id, data, res) => {
  try {
    const product = await Product.findById(id);
    if (!product) throw new Error("Product not found");

    if (data.price) product.price = data.price;
    if (data.description) product.description = data.description;

    await product.save();
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
    let filter = {};
    if (req.query.category) filter.category = req.query.category;

    let sort = {};
    if (req.query.sort) {
      const sortField = req.query.sort.startsWith("-")
        ? req.query.sort.substring(1)
        : req.query.sort;
      const sortOrder = req.query.sort.startsWith("-") ? -1 : 1;
      sort[sortField] = sortOrder;
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    let products = await Product.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean();

    for (let product of products) {
      const reviews = await Review.find({ productId: product._id });
      product.averageRating = reviews.length
        ? (
            reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
          ).toFixed(1)
        : "No ratings";
    }

    return responseMessage(
      res,
      200,
      { total: products.length, page, limit, data: products },
      "Products retrieved successfully",
      true
    );
  } catch (error) {
    return errorHandler(error, res);
  }
};
