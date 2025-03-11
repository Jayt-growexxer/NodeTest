const express = require("express");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productroutes");
const Product = require("./models/productSchema");
const reviewRoutes = require("./routes/reviewroutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRouters");
const app = express();
app.use(express.json());
connectDB();
app.use("/v0", productRoutes);
app.use("/v0", reviewRoutes);
app.use("/v0", userRoutes);
app.use("/v0", orderRoutes);
app.patch("/v0/products/:id", async (req, res) => {
  try {
    let { id } = req.params;
    id = id.trim(); // Ensure no extra spaces or newlines

    // Find the product first
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Update the product manually
    product.price = req.body.price;
    product.description = req.body.description;

    // Save the updated product
    const updatedProduct = await product.save();

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Your are onboarded into ${process.env.PORT} port`);
});
