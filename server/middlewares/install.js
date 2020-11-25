/**
 * This module contains middleware for install the application
 */

// ---------------------------------------------------------------------------

/**
 * import modules
 */

// this module contains utils for shop
const shopUtils = require("../utils/shop");

// this module contains configs
const configs = require("../config/config");

// this module contains shop controllers
const shopController = require("../controllers/shop");

// ---------------------------------------------------------------------------

/**
 * middlewares
 */

/**
 * This middleware check the validity of request
 * if checks whether given token and shop is in exists in db or not
 */
const isValidRequest = async (req, res, next) => {
   try {
      const shop = req.headers.shop;
      const accessToken = req.headers.accesstoken;
      const shopData = await shopController.getShop({ shop, accessToken });

      // check if access token and shop is in database or not
      if (shopData) {
         req.shopData = shopData;
         next();
      } else {
         return res
            .status(400)
            .send({ statusCode: 400, message: "shop data not found" });
      }
   } catch (error) {
      return res
         .status(500)
         .send({ statusCode: 500, message: "internal server error" });
   }
};

/**
 * This middleware check if app is installed in shop or not
 */
const isAppInstalled = async (req, res, next) => {
   try {
      if (req.shopData.appstatus === "installed") {
         next();
      } else {
         return res
            .status(400)
            .send({ statusCode: 400, message: "app is uninstalled" });
      }
   } catch (error) {
      return res
         .status(500)
         .send({ statusCode: 500, message: "internal server error" });
   }
};

// ---------------------------------------------------------------------------

/**
 * export modules
 */

module.exports = { isAppInstalled, isValidRequest };
