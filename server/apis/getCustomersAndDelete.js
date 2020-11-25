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

// ---------------------------------------------------------------------------

/**
 * apis
 */

/**
 * This api install the app (redirect to oauth of shopify)
//  
 */

//function
const getCustomersAndDelete = async (req, res, next) => {
   console.log("--------------------");
   // shop and access token
   const shop = req.headers.shop;
   const accesstoken = req.headers.accesstoken;

   // get shop data
   const shopData = await shopModel.findOne({ shop }).select();

   // header for request
   const header = {
      "X-Shopify-Access-Token": shopData.accessToken,
   };

   // getAllCustomers
   const getAllCustomers = `https://${shopData.shop}/admin/api/2020-10/customers.json`;

   try {
      // get all Customers from shopify
      var allCustomers = await axios({
         url: getAllCustomers,
         method: "GET",
         responseType: "json",
         headers: header,
      });

      //   all Customers id
      const allCustomersId = [];

      let array_length = allCustomers.data.customers.length;

      //   store all Customers_id into array called "allCustomersId"
      for (let i = 0; i < array_length; i++) {
         allCustomersId.push(
            allCustomers.data.customers[i].addresses[0].customer_id
         );
      }

      //Delete all products based on Customer id

      for (let index = 0; index < allCustomersId.length; index++) {
         // api for delete
         const deleteCustomersById = `https://${shopData.shop}/admin/api/2020-10/customers/${allCustomersId[index]}.json`;

         //API calling for delete Products in shopify
         var allCustomers = await axios({
            url: deleteCustomersById,
            method: "DELETE",
            responseType: "json",
            headers: header,
         });

         //  delete products from db from collection called "productids"
         customersIdModel.findOneAndDelete(
            { customers_id: allCustomersId[index], shop_id: shop },
            function (err, docs) {
               if (err) {
                  console.log(err);
                  console.log(
                     "error in find and delete decument baased on customer"
                  );
               } else {
                  console.log("Deleted User : ", docs);
               }
            }
         );
      }
      res.status(200).send({ data: allCustomers.data });
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

module.exports = { getCustomersAndDelete };

// ---------------------------------------------------------------------------

/**
 * exports
 */
