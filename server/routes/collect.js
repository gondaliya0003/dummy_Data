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
const collectApi = require("../apis/collect");

// // this module contains install middlewares
const installMiddleware = require("../middlewares/install");

// ---------------------------------------------------------------------------

/**
 * routes
 */

router.post(
   "/collect",
   installMiddleware.isValidRequest,
   installMiddleware.isAppInstalled,
   collectApi.addCollect
);

// ---------------------------------------------------------------------------

/**
 * export routes
 */

module.exports = router;
