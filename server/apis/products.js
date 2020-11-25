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
const productIdModel = require("../models/productId");
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
const addProduct = async (req, res, next) => {
   const shop = req.headers.shop;
   const accesstoken = req.headers.accesstoken;

   // get shop data
   const shopData = await shopModel.findOne({ shop }).select();

   // get detail from shop data

   // url
   const url = `https://${shopData.shop}/admin/api/2020-10/products.json`;

   // header for request
   const header = {
      "X-Shopify-Access-Token": shopData.accessToken,
   };

   try {
      for (const singleData of rowData.urlData) {
         await delay(700);
         var products = await axios({
            url,
            method: "POST",
            responseType: "json",
            data: singleData,
            headers: header,
         });

         console.log(products.data.product.id);

         // add product_varient_id in db
         const productVarientInstance = new ProductDetailModel({
            varient_id: products.data.product.variants[0].id,
            shop_id: shop,
         });

         productVarientInstance.save((error, res) => {
            if (error) {
               console.log("ERROR IN DB ADD PRODUCT VARIENT PRODUCTS.JS");
            } else {
               console.log("SUCCESSFULL SAVE DATA IN PARODUCT VARIENT", res);
            }
         });

         // add product_id in db
         const productIdInstance = new productIdModel({
            product_Id: products.data.product.id,
            shop_id: shop,
         });

         productIdInstance.save((error, res) => {
            if (error) {
               console.log("Error in saving product_id in db", error);
            } else {
               console.log("successfully in saving product_id in db", res);
            }
         });
      }

      res.status(200).send({ data: products.data });

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

module.exports = { addProduct };

// ---------------------------------------------------------------------------

/**
 * exports
 */
