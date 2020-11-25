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

//function
const getProducts = async (req, res, next) => {
   console.log("--------------------");
   // shop and access token
   const shop = req.headers.shop;
   const accesstoken = req.headers.accesstoken;

   // get shop data
   const shopData = await shopModel.findOne({ shop }).select();

   // get detail from shop data

   // getAllProductsId
   const getAllProductsId = `https://${shopData.shop}/admin/api/2020-10/products.json`;

   // header for request
   const header = {
      "X-Shopify-Access-Token": shopData.accessToken,
   };

   try {
      // get all products from shopify
      var allProducts = await axios({
         url: getAllProductsId,
         method: "GET",
         responseType: "json",
         headers: header,
      });

      console.log(
         "allProducts-------------------",
         allProducts.data.products[0].variants[0].product_id,
         allProducts.data.products.length
      );

      //   all products id
      const allProductId = [];

      //   store all products id into array called "allProductId"
      for (let i = 0; i < allProducts.data.products.length; i++) {
         allProductId.push(allProducts.data.products[i].variants[0].product_id);
      }
      console.log(allProductId);

      //Delete all products based on products id

      for (let index = 0; index < allProductId.length; index++) {
         // api for delete
         const deleteProductsById = `https://${shopData.shop}/admin/api/2020-10/products/${allProductId[index]}.json`;

         //API calling for delete Products in shopify
         var allProducts = await axios({
            url: deleteProductsById,
            method: "DELETE",
            responseType: "json",
            headers: header,
         });

         //  delete products from db from collection called "productids"
         //  based on shop_id and product_id
         productIdModel.findOneAndDelete(
            { product_Id: allProductId[index], shop_id: shop },
            function (err, docs) {
               if (err) {
                  console.log(err);
                  console.log(
                     "error in find and delete decument baased on products"
                  );
               } else {
                  console.log("Deleted User : ", docs);
               }
            }
         );
      }

      res.status(200).send({ data: allProducts.data });

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

module.exports = { getProducts };

// ---------------------------------------------------------------------------

/**
 * exports
 */
