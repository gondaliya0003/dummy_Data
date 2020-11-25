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
const orderApi = require("../apis/order");

// // this module contains install middlewares
const installMiddleware = require("../middlewares/install");

// ---------------------------------------------------------------------------

/**
 * routes
 */

router.post(
   "/orders",
   installMiddleware.isValidRequest,
   installMiddleware.isAppInstalled,
   orderApi.addOrder
);

// ---------------------------------------------------------------------------

/**
 * export routes
 */

module.exports = router;
