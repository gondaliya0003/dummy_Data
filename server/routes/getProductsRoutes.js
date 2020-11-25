/**
 * This module contains routes for install the apps
 */

// ---------------------------------------------------------------------------

/**
 * import moduules
 */

// this is server
const express = require("express");

// this is for create seperate routers
const router = express.Router();

// this module contains install api
const getProductsRoutesApi = require("../apis/getProductsRoutesApi");

// // this module contains install middlewares
const installMiddleware = require("../middlewares/install");

// ---------------------------------------------------------------------------

/**
 * routes
 */

router.get(
   "/getProductsApi",
   installMiddleware.isValidRequest,
   installMiddleware.isAppInstalled,
   getProductsRoutesApi.getProducts
);

// ---------------------------------------------------------------------------

/**
 * export routes
 */

module.exports = router;
