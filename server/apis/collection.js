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
const CollectionModel = require("../models/collectionId");

// ---------------------------------------------------------------------------

/**
 * apis
 */

/**
 * This api install the app (redirect to oauth of shopify)
//  
 */

//function
const addCollection = async (req, res, next) => {
   const shop = req.headers.shop;
   const accesstoken = req.headers.accesstoken;

   // get shop data
   const shopData = await shopModel.findOne({ shop }).select();

   // url
   const url = `https://${shopData.shop}/admin/api/2020-10/custom_collections.json`;

   // header for request
   const header = {
      "X-Shopify-Access-Token": shopData.accessToken,
   };

   try {
      for (const singleData of rowData.collectionData) {
         // add customer in shopify
         var customCollectionId = await axios({
            url,
            method: "POST",
            responseType: "json",
            data: singleData,
            headers: header,
         });

         console.log(customCollectionId.data.custom_collection.id);

         // add data in db
         const CollectionModelInstance = new CollectionModel({
            collection_id: customCollectionId.data.custom_collection.id,
            shop_id: shop,
         });

         CollectionModelInstance.save((error, res) => {
            if (error) {
               console.log("error in savning collection id in db");
            } else {
               console.log("successful in savning collection id in db", res);
            }
         });

         console.log("----------------------");
         console.log(customCollectionId.data);
      }

      res.status(200).send({ data: customCollectionId.data });

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

module.exports = { addCollection };

// ---------------------------------------------------------------------------

/**
 * exports
 */
