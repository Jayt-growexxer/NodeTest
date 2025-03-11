const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });
// eslint-disable-next-line no-undef
const DB = process.env.DATABASE; // // eslint-disable-line
console.log(DB);

const connectDB = async () => {
  try {
    const con = await mongoose.connect(DB, {});

    console.log(`✅ Connected to DB file: ${con.connection.host}`);
  } catch (err) {
    console.error(`❌ DB Connection Error: ${err.message}`);
    // eslint-disable-next-line no-undef
    process.exit(1);
  }
};
module.exports = connectDB;
