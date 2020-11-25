// this is the driver for mongodb
const mongoose = require("mongoose");

// create schema
const orderSchema = mongoose.Schema({
   order_id: {
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
const orderDetail = mongoose.model("orderid", orderSchema);

// export model
module.exports = orderDetail;
