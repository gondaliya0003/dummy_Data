/**
 * This module contains install apis
 */

// ---------------------------------------------------------------------------

/**
 * import modules
 */

// this module contains utils for shop
const shopUtils = require("../utils/shop");

// this module contains utils for shop
const configs = require("../config/config");

// this module contains controllers for shop
const shopControllers = require("../controllers/shop");

//
const axios = require("axios");

const stringify = require("json-stringify-safe");

const rowData = require("../controllers/urlAddData");

require("dotenv").config();

// this is the shop model
const shopModel = require("../models/shop");
const productDetail = require("../models/productDetail");
const productId = require("../models/productId");
const OrderId = require("../models/orderId");

// ---------------------------------------------------------------------------

/**
 * apis
 */

/**
 * This api install the app (redirect to oauth of shopify)
//  
 */

function delay(ms) {
   return new Promise((resolve) => setTimeout(resolve, ms));
}
//function
const addOrder = async (req, res, next) => {
   const shop = req.headers.shop;
   const accesstoken = req.headers.accesstoken;

   // get shop data
   const shopData = await shopModel.findOne({ shop }).select();

   // url
   const url = `https://${shopData.shop}/admin/api/2020-10/orders.json`;

   // header for request
   const header = {
      "X-Shopify-Access-Token": shopData.accessToken,
   };

   //

   try {
      var i = 0;
      for (const singleData of rowData.orderData) {
         //   for (const singleData of orderData) {
         console.log("before 13500=-----------------------------------------");
         await delay(13500);
         console.log("after 13500=-----------------------------------------");
         console.log("singleData-------------------", singleData);

         const product_id = await productId
            .find({ shop_id: shop })
            .select(["product_Id"]);
         singleData.order.line_items[0].product_Id = product_id[i].product_Id;

         const veriants = await productDetail
            .find({ shop_id: shop })
            .select(["varient_id"]);
         console.log("singleData-------------------", singleData);
         singleData.order.line_items[0].variant_id = veriants[i].varient_id;

         try {
            var orders = await axios({
               url,
               method: "POST",
               responseType: "json",
               data: singleData,
               headers: header,
            });
         } catch (error) {
            console.log("error in axios od posting orders");
         }

         i += 1;
         console.log("----------------------");
         console.log("orders.data");

         // add order_id in db
         const OrderInstance = new OrderId({
            order_id: orders.data.order.id,
            shop_id: shop,
         });

         //  save order_id into db
         OrderInstance.save((error, res) => {
            if (error) {
               console.log("Error in db storing order id in order.js");
            } else {
               console.log(
                  "Successfull in db storing order id in order.js",
                  res
               );
            }
         });
      }

      // console.log("--------------------------------------------------");
      // console.log(products.data);
      console.log(
         "--------------------------------------------------------------------------------------------------------"
      );
      console.log(
         "--------------------------------------------------------------------------------------------------------"
      );
      console.log(
         "--------------------------------------------------------------------------------------------------------"
      );
      console.log(
         "--------------------------------------------------------------------------------------------------------"
      );
      console.log(
         "--------------------------------------------------------------------------------------------------------"
      );
      console.log(
         "--------------------------------------------------------------------------------------------------------"
      );
      console.log(
         "--------------------------------------------------------------------------------------------------------"
      );
      console.log(
         "--------------------------------------------------------------------------------------------------------"
      );
      console.log(
         "--------------------------------------------------------------------------------------------------------"
      );
      console.log(
         "--------------------------------------------------------------------------------------------------------"
      );
      console.log(
         "--------------------------------------------------------------------------------------------------------"
      );
      console.log(
         "--------------------------------------------------------------------------------------------------------"
      );
      res.status(200).send({ data: "data saved successfully........" });
   } catch (error) {
      console.log("--------------------------------------------------");
      console.log(error);

      // if there is some internal server error
      res.status(500).send({
         statusCode: 500,
         message: "internal server error jksfdjksdksdfkjsdkskdsfdhkjhk",
      });
   }
};

module.exports = { addOrder };

// ---------------------------------------------------------------------------

/**
 * exports
 */
