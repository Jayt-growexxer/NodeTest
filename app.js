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

app.listen(process.env.PORT, () => {
  console.log(`Your are onboarded into ${process.env.PORT} port`);
});
