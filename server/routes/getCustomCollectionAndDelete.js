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
const getCustomCollectionAndDeleteApi = require("../apis/getCustomCollectionAndDelete");

// // this module contains install middlewares
const installMiddleware = require("../middlewares/install");

// ---------------------------------------------------------------------------

/**
 * routes
 */

router.get(
   "/getCustomCollectionAndDelete",
   installMiddleware.isValidRequest,
   installMiddleware.isAppInstalled,
   getCustomCollectionAndDeleteApi.getCustomCollectionAndDelete
);

// ---------------------------------------------------------------------------

/**
 * export routes
 */

module.exports = router;
