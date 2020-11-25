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

// this is the Smart Collection ID model
const SmartCollectionIdModel = require("../models/SmartCollectionId");

// ---------------------------------------------------------------------------

/**
 * apis
 */

/**
 * This api install the app (redirect to oauth of shopify)
//  
 */

//function
const addSmartCollection = async (req, res, next) => {
   const shop = req.headers.shop;
   const accesstoken = req.headers.accesstoken;

   // get shop data
   const shopData = await shopModel.findOne({ shop }).select();

   // url
   const url = `https://${shopData.shop}/admin/api/2020-10/smart_collections.json`;

   // header for request
   const header = {
      "X-Shopify-Access-Token": shopData.accessToken,
   };

   try {
      for (const singleData of rowData.smartCollectionData) {
         var smartCollection = await axios({
            url,
            method: "POST",
            responseType: "json",
            data: singleData,
            headers: header,
         });

         // add Smart_collection_Id in db
         const smartCollectionIdInstance = new SmartCollectionIdModel({
            Smart_Collection_id: smartCollection.data.smart_collection.id,
         });

         smartCollectionIdInstance.save((error, res) => {
            if (error) {
               console.log("Error in saving smart_collectoin_id in db", error);
            } else {
               console.log(
                  "successfully in saving smart_collectoin_id in db",
                  res
               );
            }
         });

         console.log("----------------------");
         console.log(smartCollection.data);
      }

      res.status(200).send({ data: smartCollection.data });

      // console.log("--------------------------------------------------");
      // console.log(products.data);
   } catch (error) {
      console.log("--------------------------------------------------");
      console.log(error);
      // if there is some internal server error

      res.status(500).send({
         statusCode: 500,
         message: "internal server error smart_collectoin_id",
      });
   }
};

module.exports = { addSmartCollection };

// ---------------------------------------------------------------------------

/**
 * exports
 */
