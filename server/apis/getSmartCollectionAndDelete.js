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

// this is model for order id
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
const getSmartCollectionAndDelete = async (req, res, next) => {
   // shop and access token
   const shop = req.headers.shop;
   const accesstoken = req.headers.accesstoken;

   // get shop data
   const shopData = await shopModel.findOne({ shop }).select();

   // header for request
   const header = {
      "X-Shopify-Access-Token": shopData.accessToken,
   };

   // getAll_smart_collectoin_id
   const getAllSmartCollection = `https://${shopData.shop}/admin/api/2020-10/smart_collections.json`;

   try {
      // get all smart_collectoin from shopify
      var allSmartCollection = await axios({
         url: getAllSmartCollection,
         method: "GET",
         responseType: "json",
         headers: header,
      });

      //   all Customers id
      const allSmartCollectionId = [];

      let array_length = allSmartCollection.data.smart_collections.length;

      //   store all smart_collection  into array called "allSmartCollectionId"
      for (let i = 0; i < array_length; i++) {
         allSmartCollectionId.push(
            allSmartCollection.data.smart_collections[i].id
         );
      }

      console.log("))))))))))))))))))))))))))))))))))))))))))))))))))))");
      console.log("data from shopify orders", allSmartCollectionId);
      console.log("))))))))))))))))))))))))))))))))))))))))))))))))))))");

      //Delete all products based on Order id
      try {
         // main for loop

         for (let index = 0; index < allSmartCollectionId.length; index++) {
            console.log(array_length);
            console.log("------------------------------------");
            console.log(allSmartCollectionId[index]);
            console.log("------------------------------------");
            // api for delete data in shopify
            const deleteSmartCollectionById = `https://${shopData.shop}/admin/api/2020-10/smart_collections/${allSmartCollectionId[index]}.json`;

            //API calling for delete Smart Collection By Id in shopify
            var allSmartCollections = await axios({
               url: deleteSmartCollectionById,
               method: "DELETE",
               responseType: "json",
               headers: header,
            });

            SmartCollectionIdModel.findOneAndDelete(
               { Smart_Collection_id: allSmartCollectionId[index] },
               (err, docs) => {
                  if (err) {
                     console.log(err);
                     console.log(
                        "error in find and delete decument baased on allSmartCollectionId"
                     );
                  } else {
                     console.log("Deleted User : ", docs);
                  }
               }
            );
         }
      } catch (error) {
         console.log(
            "error in deleting data from db in allSmartCollectionId",
            error
         );
      }

      res.status(200).send({
         data: "successfully deleted data allSmartCollectionId",
      });
   } catch (error) {
      // console.log("--------------------------------------------------");
      // console.log(products.data);
      console.log("--------------------------------------------------");
      console.log(error);
      // if there is some internal server error

      res.status(500).send({
         statusCode: 500,
         message: "internal server error allSmartCollectionId",
      });
   }
};

module.exports = { getSmartCollectionAndDelete };

// ---------------------------------------------------------------------------

/**
 * exports
 */
