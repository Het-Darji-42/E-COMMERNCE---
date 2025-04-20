const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const connectDb = async () => {
  try {
      const conn = await mongoose.connect(process.env.MONGO_URI);
      console.log('mongoDb Is Connected Succesffuly' .rainbow)
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};
module.exports = connectDb
