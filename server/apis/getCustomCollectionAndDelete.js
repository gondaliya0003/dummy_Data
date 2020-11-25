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
const CustomCollectionIdModel = require("../models/collectionId");

// ---------------------------------------------------------------------------

/**
 * apis
 */

/**
 * This api install the app (redirect to oauth of shopify)
//  
 */

//function
const getCustomCollectionAndDelete = async (req, res, next) => {
   // shop and access token
   const shop = req.headers.shop;
   const accesstoken = req.headers.accesstoken;

   // get shop data
   const shopData = await shopModel.findOne({ shop }).select();

   // header for request
   const header = {
      "X-Shopify-Access-Token": shopData.accessToken,
   };

   // get All_Custom_collectoin_id
   const getAllCustomCollection = `https://${shopData.shop}/admin/api/2020-10/custom_collections.json`;

   try {
      // get all Custom_collection from shopify
      var AllCustomCollection = await axios({
         url: getAllCustomCollection,
         method: "GET",
         responseType: "json",
         headers: header,
      });

      //   all allCustomCollectionId
      const allCustomCollectionId = [];

      let array_length = AllCustomCollection.data.custom_collections.length;

      //   store all custom_collections  into array called "allCustomCollectionId"
      for (let i = 0; i < array_length; i++) {
         allCustomCollectionId.push(
            AllCustomCollection.data.custom_collections[i].id
         );
      }

      console.log("))))))))))))))))))))))))))))))))))))))))))))))))))))");
      console.log("data from shopify orders", allCustomCollectionId);
      console.log("))))))))))))))))))))))))))))))))))))))))))))))))))))");

      //Delete all products based on Order id
      try {
         // main for loop

         for (let index = 0; index < allCustomCollectionId.length; index++) {
            console.log(array_length);
            console.log("------------------------------------");
            console.log(allCustomCollectionId[index]);
            console.log("------------------------------------");
            // api for delete data in shopify
            const deleteCustomCollectionById = `https://${shopData.shop}/admin/api/2020-10/custom_collections/${allCustomCollectionId[index]}.json`;

            //API calling for delete Smart Collection By Id in shopify
            var allCustomCollections = await axios({
               url: deleteCustomCollectionById,
               method: "DELETE",
               responseType: "json",
               headers: header,
            });

            CustomCollectionIdModel.findOneAndDelete(
               { collection_id: allCustomCollectionId[index] },
               (err, docs) => {
                  if (err) {
                     console.log(err);
                     console.log(
                        "error in find and delete decument baased on allCustomCollectionId"
                     );
                  } else {
                     console.log("Deleted User : ", docs);
                  }
               }
            );
         }
      } catch (error) {
         console.log(
            "error in deleting data from db in allCustomCollectionId",
            error
         );
      }

      res.status(200).send({
         data: "successfully deleted data allCustomCollectionId",
      });
   } catch (error) {
      // console.log("--------------------------------------------------");
      // console.log(products.data);
      console.log("--------------------------------------------------");
      console.log(error);
      // if there is some internal server error

      res.status(500).send({
         statusCode: 500,
         message: "internal server error allCustomCollectionId",
      });
   }
};

module.exports = { getCustomCollectionAndDelete };

// ---------------------------------------------------------------------------

/**
 * exports
 */
