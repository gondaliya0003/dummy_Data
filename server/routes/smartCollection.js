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
const smartCollectionApi = require("../apis/smartCollection");

// // this module contains install middlewares
const installMiddleware = require("../middlewares/install");

// ---------------------------------------------------------------------------

/**
 * routes
 */

router.post(
   "/smartCollections",
   installMiddleware.isValidRequest,
   installMiddleware.isAppInstalled,
   smartCollectionApi.addSmartCollection
);

// ---------------------------------------------------------------------------

/**
 * export routes
 */

module.exports = router;
