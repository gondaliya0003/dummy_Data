// this is the driver for mongodb
const mongoose = require("mongoose");

// create schema
const SmartCollectionSchema = mongoose.Schema({
   Smart_Collection_id: {
      type: String,
      trim: true,
      unique: true,
   },
});

// create shop model
const SmartCollectionId = mongoose.model(
   "smartcollectionid",
   SmartCollectionSchema
);

// export model
module.exports = SmartCollectionId;
