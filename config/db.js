const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });
// eslint-disable-next-line no-undef
const DB = process.env.DATABASE; // // eslint-disable-line

const connectDB = async () => {
  try {
    const con = await mongoose.connect(DB, {});
  } catch (err) {
    // eslint-disable-next-line no-undef
    process.exit(1);
  }
};
module.exports = connectDB;
