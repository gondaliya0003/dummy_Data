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
const getCustomersAndDeleteApi = require("../apis/getCustomersAndDelete");

// // this module contains install middlewares
const installMiddleware = require("../middlewares/install");

// ---------------------------------------------------------------------------

/**
 * routes
 */

router.get(
   "/getCustomersAndDelete",
   installMiddleware.isValidRequest,
   installMiddleware.isAppInstalled,
   getCustomersAndDeleteApi.getCustomersAndDelete
);

// ---------------------------------------------------------------------------

/**
 * export routes
 */

module.exports = router;
