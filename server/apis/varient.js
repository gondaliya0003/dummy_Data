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

// ---------------------------------------------------------------------------

/**
 * apis
 */

/**
 * This api install the app (redirect to oauth of shopify)
//  
 */

//function
const addVarient = async (req, res, next) => {
   const shop = req.headers.shop;
   const accesstoken = req.headers.accesstoken;

   // get shop data
   const shopData = await shopModel.findOne({ shop }).select();

   // url
   const url = `https://${shopData.shop}/admin/api/2020-10/products/6088708817095/variants.json`;

   // header for request
   const header = {
      "X-Shopify-Access-Token": shopData.accessToken,
   };

   try {
      //   for (const singleData of rowData.varientData) {
      var col = await axios({
         url,
         method: "POST",
         responseType: "json",
         data: {
            variant: {
               image_id: 850703190,
               option1: "Purple",
            },
         },
         headers: header,
      });
      console.log(
         "2345769234567923478562934786592347865923478659234786592478359234786592347865923478562934785629347856"
      );
      console.log(col.data);
      //   }

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

module.exports = { addVarient };

// ---------------------------------------------------------------------------

/**
 * exports
 */
