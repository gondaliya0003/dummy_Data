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

// this is model of product varient id
const ProductDetailModel = require("../models/productDetail");

// this is model for product id
const customersIdModel = require("../models/customersId");

// this is model for order id
const orderIdModel = require("../models/orderId");

// ---------------------------------------------------------------------------

/**
 * apis
 */

/**
 * This api install the app (redirect to oauth of shopify)
//  
 */

//function
const getOrdersAndDelete = async (req, res, next) => {
   // shop and access token
   const shop = req.headers.shop;
   const accesstoken = req.headers.accesstoken;

   // get shop data
   const shopData = await shopModel.findOne({ shop }).select();

   // header for request
   const header = {
      "X-Shopify-Access-Token": shopData.accessToken,
   };

   // getAllOrders
   const getAllOrders = `https://${shopData.shop}/admin/api/2020-10/orders.json?status=any`;

   try {
      // get all Orders from shopify
      var allOrders = await axios({
         url: getAllOrders,
         method: "GET",
         responseType: "json",
         headers: header,
      });

      //   all Orders id
      const allOrdersId = [];

      let array_length = allOrders.data.orders.length;

      //   store all Order_id into array called "allOrdersId"
      for (let i = 0; i < array_length; i++) {
         allOrdersId.push(allOrders.data.orders[i].id);
      }

      console.log("))))))))))))))))))))))))))))))))))))))))))))))))))))");
      console.log("data from shopify orders", allOrdersId);
      console.log("))))))))))))))))))))))))))))))))))))))))))))))))))))");

      //Delete all products based on Order id
      try {
         // main for loop

         for (let index = 0; index < allOrdersId.length; index++) {
            console.log(array_length);
            console.log("------------------------------------");
            console.log(allOrdersId[index]);
            console.log("------------------------------------");
            // api for delete
            const deleteOrdersById = `https://${shopData.shop}/admin/api/2020-10/orders/${allOrdersId[index]}.json`;

            //API calling for delete Oreders in shopify
            var allOrder = await axios({
               url: deleteOrdersById,
               method: "DELETE",
               responseType: "json",
               headers: header,
            });

            //  delete products from db from collection called "orderids"
            orderIdModel.findOneAndDelete(
               { shop_id: shop, order_id: allOrdersId[index] },
               (err, docs) => {
                  if (err) {
                     console.log(err);
                     console.log(
                        "error in find and delete decument baased on order"
                     );
                  } else {
                     console.log("Deleted User : ", docs);
                  }
               }
            );
         }
      } catch (error) {
         console.log("error in deleting data from db", error);
      }

      res.status(200).send({ data: "successfully deleted data" });
   } catch (error) {
      // console.log("--------------------------------------------------");
      // console.log(products.data);
      console.log("--------------------------------------------------");
      console.log(error);
      // if there is some internal server error

      res.status(500).send({
         statusCode: 500,
         message: "internal server error jksfdjksdksdfkjsdkskdsfdhkjhk",
      });
   }
};

module.exports = { getOrdersAndDelete };

// ---------------------------------------------------------------------------

/**
 * exports
 */
