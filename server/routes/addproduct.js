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
const productsApi = require("../apis/products");

// // this module contains install middlewares
const installMiddleware = require("../middlewares/install");

// ---------------------------------------------------------------------------

/**
 * routes
 */

router.post(
   "/products",
   installMiddleware.isValidRequest,
   installMiddleware.isAppInstalled,
   productsApi.addProduct
);

// ---------------------------------------------------------------------------

/**
 * export routes
 */

module.exports = router;
