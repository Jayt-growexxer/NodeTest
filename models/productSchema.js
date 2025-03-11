const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A product have a name"],
    unique: true,
  },
  description: {
    type: String,
    required: [true, "A product have a description"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "A product have a Price"],
  },
  category: {
    type: String,
    required: [true, " A product belongs to particular category"],
  },
  images: [
    {
      type: String,
      required: [true, "A product have atleast one image"],
    },
  ],
  stocks: {
    type: Number,
    required: [true, "A product have some Quantity"],
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
