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
const CollectionIdModel = require("../models/collectionId");
const ProductIdModel = require("../models/productId");

// ---------------------------------------------------------------------------

/**
 * apis
 */

/**
 * This api install the app (redirect to oauth of shopify)
//  
 */

//function
const addCollect = async (req, res, next) => {
   const shop = req.headers.shop;
   const accesstoken = req.headers.accesstoken;

   // get shop data
   const shopData = await shopModel.findOne({ shop }).select();

   // url
   const url = `https://${shopData.shop}/admin/api/2020-10/collects.json`;

   // header for request
   const header = {
      "X-Shopify-Access-Token": shopData.accessToken,
   };

   try {
      // sample data
      const singleData = {
         collect: {
            product_id: null,
            collection_id: null,
         },
      };

      // get collection_id from db
      let collection_id_db = await CollectionIdModel.find({}).select([
         "collection_id",
      ]);

      // get product_id from db
      let product_id_db = await ProductIdModel.find({}).select(["product_Id"]);

      for (let i = 0; i < 2; i++) {
         console.log("---------DATA OF DB-----");
         console.log(collection_id_db[0].collection_id);
         console.log(product_id_db[i].product_Id);
         console.log("------------------------");

         console.log("---DATA OF COLLECT OBJ -----------");
         console.log(singleData.collect.product_id);
         console.log(singleData.collect.collection_id);

         singleData.collect.collection_id = collection_id_db[i].collection_id;

         for (var index = 0; index < 3; index++) {
            singleData.collect.product_id = product_id_db[index].product_Id;

            console.log("****************************,index", index);

            console.log(singleData.collect.collection_id);
            console.log(singleData.collect.product_id);
            console.log(singleData);

            try {
               var col = await axios({
                  url,
                  method: "POST",
                  responseType: "json",
                  data: singleData,
                  headers: header,
               });

               console.log("SUCCESS");
            } catch (error) {
               console.log("ERROR", error);
               return res.status(200).send({ msg: error });
            }
         }

         console.log("----------------------------------");
      }

      res.status(200).send({ data: col.data });

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

module.exports = { addCollect };

// ---------------------------------------------------------------------------

/**
 * exports
 */
