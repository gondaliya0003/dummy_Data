// this is the driver for mongodb
const mongoose = require("mongoose");
const { mockComponent } = require("react-dom/test-utils");

// SCHEMA FOR PRODUCT ID
const productIdSchema = mongoose.Schema({
    product_Id: {
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

//create productId model
const productId = mongoose.model("productId", productIdSchema);

// export model
module.exports = productId;
