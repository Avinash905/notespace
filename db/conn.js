const mongoose = require("mongoose");
require("dotenv").config();
mongoose.set("strictQuery", false);

const mongodbconn = mongoose
  .connect(process.env.DB_URI)
  .then(() => {})
  .catch((err) => {
    throw new Error(err);
  });

module.exports = mongodbconn;
