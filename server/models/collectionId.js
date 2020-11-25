// this is the driver for mongodb
const mongoose = require("mongoose");

// create schema
const CollectionSchema = mongoose.Schema({
   collection_id: {
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
const CollectionDetail = mongoose.model(
   "customCollectionids",
   CollectionSchema
);

// export model
module.exports = CollectionDetail;
