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
const collectionApi = require("../apis/collection");

// // this module contains install middlewares
const installMiddleware = require("../middlewares/install");

// ---------------------------------------------------------------------------

/**
 * routes
 */

router.post(
   "/customCollections",
   installMiddleware.isValidRequest,
   installMiddleware.isAppInstalled,
   collectionApi.addCollection
);

// ---------------------------------------------------------------------------

/**
 * export routes
 */

module.exports = router;
