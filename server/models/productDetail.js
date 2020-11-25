// this is the driver for mongodb
const mongoose = require("mongoose");

// create schema
const productSchema = mongoose.Schema({
    varient_id: {
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
const productDetail = mongoose.model("varientid", productSchema);

// export model
module.exports = productDetail;
