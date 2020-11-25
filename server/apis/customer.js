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

// this is the customers model
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
const addCustomer = async (req, res, next) => {
   const shop = req.headers.shop;
   const accesstoken = req.headers.accesstoken;

   // get shop data
   const shopData = await shopModel.findOne({ shop }).select();

   // url
   const url = `https://${shopData.shop}/admin/api/2020-10/customers.json`;

   // header for request
   const header = {
      "X-Shopify-Access-Token": shopData.accessToken,
   };

   console.log("====================");
   console.log(url);
   console.log(header);
   console.log("====================");
   try {
      for (const singleData of rowData.customerData) {
         console.log("`````````````````````````````````````````````````");
         console.log(singleData);

         // add Customer data in shopify
         var dataOfCustomer = await axios({
            url,
            method: "POST",
            responseType: "json",
            data: singleData,
            headers: header,
         });

         console.log("-------------");
         console.log(dataOfCustomer.data.customer.addresses[0].customer_id);

         // add customer_id,shop_id in db
         const CustomerIdInstance = new customersIdModel({
            customers_id: dataOfCustomer.data.customer.addresses[0].customer_id,
            shop_id: shop,
         });

         // save data in db
         CustomerIdInstance.save((error, res) => {
            if (error) {
               console.log("Error in db storing customer id in customer.js");
            } else {
               console.log(
                  "Successfull in db storing customer id in customer.js",
                  res
               );
            }
         });
      }
      console.log(dataOfCustomer.data);

      res.status(200).send({ data: dataOfCustomer.data });

      // console.log("--------------------------------------------------");
      // console.log(products.data);
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

module.exports = { addCustomer };

// ---------------------------------------------------------------------------

/**
 * exports
 */
