// this is the driver for mongodb
const mongoose = require("mongoose");

// create schema
const CustomersSchema = mongoose.Schema({
   customers_id: {
      type: String,
      trim: true,
      unique: true,
   },
   shop_id: {
      type: String,
      trim: true,
   },
});

// create shop model
const CustomersId = mongoose.model("customerid", CustomersSchema);

// export model
module.exports = CustomersId;
